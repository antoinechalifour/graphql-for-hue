import { config as loadEnv } from "dotenv";
import assert from "assert";
import path from "path";
import { ensureDirSync, readJSONSync, writeJsonSync } from "fs-extra";

loadEnv();

export const HUE_BRIDGE_ADDRESS = process.env.HUE_BRIDGE_ADDRESS!;
export const PERSISTENCE_DIR = path.join(__dirname, "../", ".g4h-cache");
export const PROPERTIES_FILE = path.join(PERSISTENCE_DIR, "properties.json");

assert(HUE_BRIDGE_ADDRESS, "Env variable HUE_BRIDGE_ADDRESS is required");

export function getConfig() {
  ensureDirSync(PERSISTENCE_DIR);

  let userName: string | null = null;
  let properties: any = {};

  try {
    properties = readJSONSync(PROPERTIES_FILE);
    userName = properties.userName;
  } catch {}

  return { userName };
}

export function writeConfig(config: any) {
  const currentconfig = getConfig();

  Object.assign(currentconfig, config);

  writeJsonSync(PROPERTIES_FILE, currentconfig);
}
