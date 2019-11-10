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
  type LightState {
    on: Boolean!
    bri: Int!
    alert: String!

    "Null for Dimmable Lights"
    hue: Int

    "Null for Dimmable Lights"
    sat: Int

    "Null for Dimmable Lights"
    effect: String

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
  }

  type Query {
    lights: [Light!]!
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
        }
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
