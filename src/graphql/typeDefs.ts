import { gql } from "apollo-server-koa";

export const typeDefs = gql`
  enum LightAlert {
    NONE
    SELECT
    LONG_SELECT
  }

  enum LightEffect {
    NONE
    COLOR_LOOP
  }

  type LightState {
    on: Boolean!
    bri: Int!
    alert: LightAlert!

    "Null for Dimmable Lights"
    hue: Int

    "Null for Dimmable Lights"
    sat: Int

    "Null for Dimmable Lights"
    effect: LightEffect

    xy: [Float!]

    "Null for Dimmable Lights"
    ct: Int

    "Null for Dimmable Lights"
    colormode: String
    mode: String!
    reachable: Boolean!
  }

  type SoftwareUpdate {
    state: String!
    lastinstall: String!
  }

  type CapabilitiesCt {
    min: Int!
    max: Int!
  }

  type CapabilitiesControl {
    mindimlevel: Int!
    maxlumen: Int!

    "Null for Dimmable Lights"
    colorgamuttype: String

    "Null for Dimmable Lights"
    colorgamut: [[Float!]!]

    "Null for Dimmable Lights"
    ct: CapabilitiesCt
  }

  type CapabilitiesStreaming {
    renderer: Boolean!
    proxy: Boolean!
  }

  type Capabilities {
    certified: Boolean!
    control: CapabilitiesControl!
    streaming: CapabilitiesStreaming!
  }

  type StartUpConfig {
    mode: String!
    configured: Boolean!
  }

  type LightConfig {
    archetype: String!
    function: String!
    direction: String!
    startup: StartUpConfig!
  }

  type Light {
    id: String!
    state: LightState!
    swupdate: SoftwareUpdate
    type: String!
    name: String!
    modelid: String!
    manufacturername: String!
    productname: String!
    capabilities: Capabilities!
    config: LightConfig!
    uniqueid: String!
    swversion: String!
    swconfigid: String
    productid: String
  }

  type Query {
    lights: [Light!]!
    light(id: String!): Light!
  }

  type UpdateLightStateResponse {
    success: Boolean!
    light: Light!
  }

  input UpdateLightState {
    on: Boolean
    bri: Int
    hue: Int
    sat: Int
    xy: [Float!]
    ct: Int
    alert: LightAlert
    effect: LightEffect
    transitiontime: Int
    bri_inc: Int
    sat_inc: Int
    hue_inc: Int
    ct_inc: Int
    xy_inc: [Float!]
  }

  type Mutation {
    updateLightState(
      id: String!
      state: UpdateLightState!
    ): UpdateLightStateResponse!
  }
`;
