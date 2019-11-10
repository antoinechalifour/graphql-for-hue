import Koa from "koa";
import { ApolloServer, gql } from "apollo-server-koa";
import { LightsHttp } from "./http/Lights";
import { getAuthenticatedHttpClient } from "./http/client";
import { HUE_BRIDGE_ADDRESS } from "./config";

export interface AppOptions {
  userName: string;
}

export interface GraphqlContext {
  services: {
    lights: LightsHttp;
  };
}

const typeDefs = gql`
  enum LightAlert {
    NONE
    SELECT
    LONG_SELECT
  }

  enum LightEffect {
    NONE
    COLOR_LOOP
  }

  type LightState {
    on: Boolean!
    bri: Int!
    alert: LightAlert!

    "Null for Dimmable Lights"
    hue: Int

    "Null for Dimmable Lights"
    sat: Int

    "Null for Dimmable Lights"
    effect: LightEffect

    xy: [Float!]

    "Null for Dimmable Lights"
    ct: Int

    "Null for Dimmable Lights"
    colormode: String
    mode: String!
    reachable: Boolean!
  }

  type SoftwareUpdate {
    state: String!
    lastinstall: String!
  }

  type CapabilitiesCt {
    min: Int!
    max: Int!
  }

  type CapabilitiesControl {
    mindimlevel: Int!
    maxlumen: Int!

    "Null for Dimmable Lights"
    colorgamuttype: String

    "Null for Dimmable Lights"
    colorgamut: [[Float!]!]

    "Null for Dimmable Lights"
    ct: CapabilitiesCt
  }

  type CapabilitiesStreaming {
    renderer: Boolean!
    proxy: Boolean!
  }

  type Capabilities {
    certified: Boolean!
    control: CapabilitiesControl!
    streaming: CapabilitiesStreaming!
  }

  type StartUpConfig {
    mode: String!
    configured: Boolean!
  }

  type LightConfig {
    archetype: String!
    function: String!
    direction: String!
    startup: StartUpConfig!
  }

  type Light {
    id: String!
    state: LightState!
    swupdate: SoftwareUpdate
    type: String!
    name: String!
    modelid: String!
    manufacturername: String!
    productname: String!
    capabilities: Capabilities!
    config: LightConfig!
    uniqueid: String!
    swversion: String!
    swconfigid: String!
    productid: String!
  }

  type Query {
    lights: [Light!]!
    light(id: String!): Light!
  }
`;

export function createApp({ userName }: AppOptions) {
  const app = new Koa();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        lights: (_obj: undefined, _args: {}, { services }: GraphqlContext) => {
          return services.lights.fetchAllLights();
        },
        light: (
          _obj: undefined,
          { id }: { id: string },
          { services }: GraphqlContext
        ) => {
          return services.lights.fetchLight(id);
        }
      },
      LightAlert: {
        NONE: "none",
        SELECT: "select",
        LONG_SELECT: "lselect"
      },
      LightEffect: {
        NONE: "none",
        COLOR_LOOP: "colorloop"
      }
    },
    context: (): GraphqlContext => {
      const httpClient = getAuthenticatedHttpClient(
        HUE_BRIDGE_ADDRESS,
        userName
      );
      const lights = new LightsHttp(httpClient);

      return {
        services: { lights }
      };
    }
  });

  app.use(apolloServer.getMiddleware());

  return app;
}
