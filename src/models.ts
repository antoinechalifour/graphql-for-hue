export interface Light {
  id: string;
  state: {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: "none" | "colorloop";
    xy: number[];
    ct: number;
    alert: "none" | "select" | "lselect";
    colormode: string;
    mode: string;
    reachable: boolean;
  };
  swupdate: {
    state: string;
    lastinstall: string;
  };
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  productname: string;
  capabilities: {
    certified: boolean;
    control: {
      mindimlevel: number;
      maxlumen: number;
      colorgamuttype: string;
      colorgamut: [number[], number[], number[]];
      ct: {
        min: number;
        max: number;
      };
    };
    streaming: {
      renderer: boolean;
      proxy: boolean;
    };
  };
  config: {
    archetype: string;
    function: string;
    direction: string;
    startup: {
      mode: string;
      configured: boolean;
    };
  };
  uniqueid: string;
  swversion: string;
  swconfigid: string;
  productid: string;
}

export interface LightStateUpdate {
  on?: boolean;
  bri?: number;
  hue?: number;
  sat?: number;
  xy?: number[];
  ct?: number;
  alert?: "none" | "select" | "lselect";
  effect?: "none" | "colorloop";
  transitiontime?: number;
  bri_inc?: number;
  sat_inc?: number;
  hue_inc?: number;
  ct_inc?: number;
  xy_inc?: number[];
}

export type GroupClass =
  | "Living room"
  | "Kitchen"
  | "Dining"
  | "Bedroom"
  | "Kids bedroom"
  | "Bathroom"
  | "Nursery"
  | "Recreation"
  | "Office"
  | "Gym"
  | "Hallway"
  | "Toilet"
  | "Front door"
  | "Garage"
  | "Terrace"
  | "Garden"
  | "Driveway"
  | "Carport"
  | "Other"
  | "Home"
  | "Downstairs"
  | "Upstairs"
  | "Top floor"
  | "Attic"
  | "Guest room"
  | "Staircase"
  | "Lounge"
  | "Man cave"
  | "Computer"
  | "Studio"
  | "Music"
  | "TV"
  | "Reading"
  | "Closet"
  | "Storage"
  | "Laundry room"
  | "Balcony"
  | "Porch"
  | "Barbecue"
  | "Pool";

export type GroupType =
  | "Luminaire"
  | "Lightsource"
  | "LightGroup"
  | "Room"
  | "Entertainment"
  | "Zone";

export interface Group {
  id: string;
  name: string;
  lights: string[];
  sensors: string[];
  type: GroupType;
  state: {
    all_on: boolean;
    any_on: boolean;
  };
  recycle: boolean;
  class: GroupClass;
  action: {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: "none" | "colorloop";
    xy: number[];
    ct: number;
    alert: "none" | "select" | "lselect";
    colormode: string;
  };
}

export interface GroupUpdate {
  name?: string;
  lights?: string[];
  class?: GroupClass;
}

export interface CreateGroup {
  name: string;
  lights: string[];
  type: GroupType;
  class?: GroupClass;
}

export interface BridgeConfig {
  name: string;
  zigbeechannel: 11 | 15 | 20 | 25 | 0;
  bridgeid: string;
  mac: string;
  dhcp: boolean;
  ipaddress: string;
  netmask: string;
  gateway: string;
  UTC: string;
  localtime: "none" | string;
  timezone: "none" | string;
  modelid: string;
  datastoreversion: string;
  swversion: string;
  apiversion: string;
  swupdate2: {
    checkforupdate: boolean;
    lastchange: string;
    bridge: {
      state: string;
      lastinstall: string;
    };
    state:
      | "unknown"
      | "noupdates"
      | "transferring"
      | "anyreadytoinstall"
      | "allreadytoinstall"
      | "installing";
    autoinstall: {
      updatetime: string;
      on: boolean;
    };
  };
  linkbutton: boolean;
  portalservices: boolean;
  portalconnection: string;
  portalstate: {
    signedon: boolean;
    incoming: boolean;
    outgoing: boolean;
    communication: string;
  };
  internetservices: {
    internet: "connected" | "disconnected";
    remoteaccess: "connected" | "disconnected";
    time: "connected" | "disconnected";
    swupdate: "connected" | "disconnected";
  };
  factorynew: boolean;
  replacesbridgeid: string;
  backup: {
    status:
      | "idle"
      | "startmigration"
      | "fileready_disabled"
      | "prepare_restore"
      | "restoring";
    errorcode: 0 | 1 | 2;
  };
  starterkitid: string;
  whitelist: Array<{
    username: string;
    last_use_date: string;
    create_date: string;
    name: string;
  }>;
}
