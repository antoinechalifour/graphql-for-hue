import { AxiosInstance } from "axios";

import { BridgeConfig } from "../models";

type ApiBridgeConfig = Omit<BridgeConfig, "whitelist"> & {
  whitelist: {
    [userId: string]: {
      "last use date": string;
      "create date": string;
      name: string;
    };
  };
};

export class BridgeConfigHttp {
  public constructor(private http: AxiosInstance) {}

  public fetchBridgeConfig(): Promise<BridgeConfig> {
    return this.http
      .get<ApiBridgeConfig>("/config")
      .then(response => response.data)
      .then(bridgeConfig => ({
        ...bridgeConfig,
        whitelist: Object.keys(bridgeConfig.whitelist).map(username => ({
          username,
          last_use_date: bridgeConfig.whitelist[username]["last use date"],
          create_date: bridgeConfig.whitelist[username]["create date"],
          name: bridgeConfig.whitelist[username].name
        }))
      }));
  }
}
