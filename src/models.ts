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
