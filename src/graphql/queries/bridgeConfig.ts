import { BridgeConfig } from "../../models";
import { QueryResolver, NoParent, NoArgs } from "../types";

export const bridgeConfig: QueryResolver<NoParent, NoArgs, BridgeConfig> = (
  _obj,
  _args,
  { services }
) => services.bridgeConfig.fetchBridgeConfig();
