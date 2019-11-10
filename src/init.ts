import { getConfig, HUE_BRIDGE_ADDRESS, writeConfig } from "./config";
import { getAnonymousHttpClient } from "./http/client";
import { UserHttp } from "./http/User";

const anonymousHttpClient = getAnonymousHttpClient(HUE_BRIDGE_ADDRESS);
const user = new UserHttp(anonymousHttpClient);

export async function initBridge() {
  let config = getConfig();

  if (!config.userName) {
    const response = await user.createUser();

    writeConfig({ userName: response.userName });
    config = getConfig();
  }

  const userName = config.userName!;

  return { userName };
}
