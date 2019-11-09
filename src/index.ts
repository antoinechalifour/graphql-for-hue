import assert from "assert";
import path from "path";
import axios from "axios";
import { ensureDirSync, readJSONSync, writeJsonSync } from "fs-extra";
import { config as loadEnv } from "dotenv";

/* API STUFF */
type CreateUserResponse = Array<{
  success?: {
    username: string;
  };
  error?: {
    type: 101;
    description: string;
  };
}>;
const makeUrl = (path: string) => `${HUE_BRIDGE_ADDRESS}${path}`;
const createUser = () =>
  axios
    .post<CreateUserResponse>(makeUrl("/api"), {
      devicetype: APPLICATION_NAME
    })
    .then(response => response.data);

/* CONFIG STUFF */
loadEnv();

const APPLICATION_NAME = "g4h#server";
const PERSISTENCE_DIR = path.join(__dirname, "../", ".g4h-cache");
const PROPERTIES_FILE = path.join(PERSISTENCE_DIR, "properties.json");
const HUE_BRIDGE_ADDRESS = process.env.HUE_BRIDGE_ADDRESS!;

assert(HUE_BRIDGE_ADDRESS, "Env variable HUE_BRIDGE_ADDRESS is required");
ensureDirSync(PERSISTENCE_DIR);

let userName: string | null = null;
let properties: any = {};

try {
  properties = readJSONSync(PROPERTIES_FILE);
  userName = properties.userName;
} catch {}

/* APPLICATION BOOTSTRAP */
async function runApp() {
  if (!userName) {
    const [response] = await createUser();

    if (response.success) {
      properties.userName = userName = response.success.username;

      writeJsonSync(PROPERTIES_FILE, properties);
    } else {
      console.log("Could not create user:", response.error!.description);
      return;
    }
  }

  console.log("Running app with user:", userName);
}

runApp();
