import { getAuthenticatedHttpClient } from "../http/client";
import { LightsHttp } from "../http/Lights";
import { HUE_BRIDGE_ADDRESS } from "../config";
import { GraphqlContext } from "./types";

export interface ContextOptions {
  userName: string;
}

export const createGraphqlContext = ({
  userName
}: ContextOptions): GraphqlContext => {
  const httpClient = getAuthenticatedHttpClient(HUE_BRIDGE_ADDRESS, userName);
  const lights = new LightsHttp(httpClient);

  return {
    services: { lights }
  };
};
