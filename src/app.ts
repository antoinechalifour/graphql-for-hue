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
        group: queries.group,
        bridgeConfig: queries.bridgeConfig,
        sensors: queries.sensors
      },
      Mutation: {
        updateLightState: mutations.updateLightState,
        renameLight: mutations.renameLight,
        renameGroup: mutations.renameGroup,
        setGroupLights: mutations.setGroupLights,
        setGroupClass: mutations.setGroupClass,
        setGroupState: mutations.setGroupState,
        createGroup: mutations.createGroup
      },
      Alert: {
        NONE: "none",
        SELECT: "select",
        LONG_SELECT: "lselect"
      },
      Effect: {
        NONE: "none",
        COLOR_LOOP: "colorloop"
      },
      GroupType: {
        LUMINAIRE: "Luminaire",
        LIGHTSOURCE: "Lightsource",
        LIGHT_GROUP: "LightGroup",
        ROOM: "Room",
        ENTERTAINMENT: "Entertainment",
        ZONE: "Zone"
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
      InternetServiceStatus: {
        CONNECTED: "connected",
        DISCONNECTED: "disconnected"
      },
      BackupState: {
        IDLE: "idle",
        START_MIGRATION: "startmigration",
        FILEREADY_DISABLED: "fileready_disabled",
        PREPARE_RESTORE: "prepare_restore",
        RESTORING: "restoring"
      },
      SoftwareUpdateState: {
        UNKNOWN: "unknown",
        NO_UPDATES: "noupdates",
        TRANSFERRING: "transferring",
        ANY_READY_TO_INSTALL: "anyreadytoinstall",
        ALL_READY_TO_INSTALL: "allreadytoinstall",
        INSTALLING: "installing"
      },
      Group: { ...entities.group },
      Sensor: { ...entities.sensor }
    },
    context: () => createGraphqlContext({ userName })
  });

  app.use(apolloServer.getMiddleware());

  return app;
}
