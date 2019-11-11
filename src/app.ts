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
        renameGroup: mutations.renameGroup
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
      Group: { ...entities.group }
    },
    context: () => createGraphqlContext({ userName })
  });

  app.use(apolloServer.getMiddleware());

  return app;
}
