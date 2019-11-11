import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";

import { createGraphqlContext } from "./graphql/context";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import * as entities from "./graphql/entities";
import { typeDefs } from "./graphql/typeDefs";

export interface AppOptions {
  userName: string;
}

export function createApp({ userName }: AppOptions) {
  const app = new Koa();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        lights: queries.lights,
        light: queries.light,
        groups: queries.groups,
        group: queries.group
      },
      Mutation: {
        updateLightState: mutations.updateLightState,
        renameLight: mutations.renameLight,
        renameGroup: mutations.renameGroup,
        setGroupLights: mutations.setGroupLights,
        setGroupClass: mutations.setGroupClass
      },
      LightAlert: {
        NONE: "none",
        SELECT: "select",
        LONG_SELECT: "lselect"
      },
      LightEffect: {
        NONE: "none",
        COLOR_LOOP: "colorloop"
      },
      GroupClass: {
        LIVING_ROOM: "Living room",
        KITCHEN: "Kitchen",
        DINING: "Dining",
        BEDROOM: "Bedroom",
        KIDS_BEDROOM: "Kids bedroom",
        BATHROOM: "Bathroom",
        NURSERY: "Nursery",
        RECREATION: "Recreation",
        OFFICE: "Office",
        GYM: "Gym",
        HALLWAY: "Hallway",
        TOILET: "Toilet",
        FRONT_DOOR: "Front door",
        GARAGE: "Garage",
        TERRACE: "Terrace",
        GARDEN: "Garden",
        DRIVEWAY: "Driveway",
        CARPORT: "Carport",
        OTHER: "Other",
        HOME: "Home",
        DOWNSTAIRS: "Downstairs",
        UPSTAIRS: "Upstairs",
        TOP_FLOOR: "Top floor",
        ATTIC: "Attic",
        GUEST_ROOM: "Guest room",
        STAIRCASE: "Staircase",
        LOUNGE: "Lounge",
        MAN_CAVE: "Man cave",
        COMPUTER: "Computer",
        STUDIO: "Studio",
        MUSIC: "Music",
        TV: "TV",
        READING: "Reading",
        CLOSET: "Closet",
        STORAGE: "Storage",
        LAUNDRY_ROOM: "Laundry room",
        BALCONY: "Balcony",
        PORCH: "Porch",
        BARBECUE: "Barbecue",
        POOL: "Pool"
      },
      Group: { ...entities.group }
    },
    context: () => createGraphqlContext({ userName })
  });

  app.use(apolloServer.getMiddleware());

  return app;
}
