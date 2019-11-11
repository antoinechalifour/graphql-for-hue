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

  enum GroupType {
    LUMINAIRE
    LIGHTSOURCE
    LIGHT_GROUP
    ROOM
    ENTERTAINMENT
    ZONE
  }

  enum GroupClass {
    LIVING_ROOM
    KITCHEN
    DINING
    BEDROOM
    KIDS_BEDROOM
    BATHROOM
    NURSERY
    RECREATION
    OFFICE
    GYM
    HALLWAY
    TOILET
    FRONT_DOOR
    GARAGE
    TERRACE
    GARDEN
    DRIVEWAY
    CARPORT
    OTHER
    HOME
    DOWNSTAIRS
    UPSTAIRS
    TOP_FLOOR
    ATTIC
    GUEST_ROOM
    STAIRCASE
    LOUNGE
    MAN_CAVE
    COMPUTER
    STUDIO
    MUSIC
    TV
    READING
    CLOSET
    STORAGE
    LAUNDRY_ROOM
    BALCONY
    PORCH
    BARBECUE
    POOL
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

  type GroupState {
    all_on: Boolean!
    any_on: Boolean!
  }

  type Group {
    id: String!
    name: String!
    lights: [Light!]!
    # TODO: sensors:
    type: GroupType!
    state: GroupState!
    recycle: Boolean!
    class: GroupClass!
    action: LightState!
    # TODO: more fields ??
  }

  type Query {
    lights: [Light!]!
    light(id: String!): Light!
    groups: [Group!]!
    group(id: String!): Group!
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

  input CreateGroup {
    lights: [String!]!
    name: String!
    type: GroupType!
    class: GroupClass
  }

  type UpdateLightResponse {
    success: Boolean!
    light: Light!
  }

  type UpdateGroupResponse {
    success: Boolean!
    group: Group!
  }

  type CreateGroupResponse {
    success: Boolean!
    group: Group!
  }

  type Mutation {
    updateLightState(
      id: String!
      state: UpdateLightState!
    ): UpdateLightResponse!

    renameLight(id: String!, name: String!): UpdateLightResponse!

    renameGroup(id: String!, name: String!): UpdateGroupResponse!

    setGroupLights(id: String!, lightIds: [String!]!): UpdateGroupResponse!

    setGroupClass(id: String!, class: GroupClass!): UpdateGroupResponse!

    setGroupState(id: String, state: UpdateLightState!): UpdateGroupResponse!

    createGroup(attributes: CreateGroup!): CreateGroupResponse!
  }
`;
