import { gql } from "apollo-server-koa";

export const typeDefs = gql`
  #########################
  ## MISC
  #########################

  enum Alert {
    NONE
    SELECT
    LONG_SELECT
  }

  enum Effect {
    NONE
    COLOR_LOOP
  }

  #########################
  ## LIGHTS
  #########################

  type LightState {
    on: Boolean!
    bri: Int!
    alert: Alert!

    "Null for Dimmable Lights"
    hue: Int

    "Null for Dimmable Lights"
    sat: Int

    "Null for Dimmable Lights"
    effect: Effect

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

  #########################
  ## GROUPS
  #########################

  type GroupState {
    all_on: Boolean!
    any_on: Boolean!
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

  type Group {
    id: String!
    name: String!
    lights: [Light!]!
    type: GroupType!
    state: GroupState!
    recycle: Boolean!
    class: GroupClass!
    action: LightState!
  }

  #########################
  ## BRIDGE CONFIG
  #########################

  type BridgeConfigSoftwareUpdateBridge {
    state: String!
    lastinstall: String!
  }

  type BridgeConfigSoftwareUpdateAutoInstall {
    updatetime: String!
    on: Boolean!
  }

  enum SoftwareUpdateState {
    UNKNOWN
    NO_UPDATES
    TRANSFERRING
    ANY_READY_TO_INSTALL
    ALL_READY_TO_INSTALL
    INSTALLING
  }

  type BridgeConfigSoftwareUpdate {
    checkforupdate: Boolean!
    lastchange: String!
    bridge: BridgeConfigSoftwareUpdateBridge!
    state: SoftwareUpdateState!
    autoinstall: BridgeConfigSoftwareUpdateAutoInstall!
  }

  type BridgeConfigPortalState {
    signedon: Boolean!
    incoming: Boolean!
    outgoing: Boolean!
    communication: String!
  }

  enum InternetServiceStatus {
    CONNECTED
    DISCONNECTED
  }

  type BridgeConfigInternetServices {
    internet: InternetServiceStatus!
    remoteaccess: InternetServiceStatus!
    time: InternetServiceStatus!
    swupdate: InternetServiceStatus!
  }

  enum BackupState {
    IDLE
    START_MIGRATION
    FILEREADY_DISABLED
    PREPARE_RESTORE
    RESTORING
  }

  type BridgeConfigBackup {
    status: BackupState!
    errorcode: Int!
  }

  type BridgeConfigUser {
    username: String!
    last_use_date: String!
    create_date: String!
    name: String!
  }

  type BridgeConfig {
    name: String!
    zigbeechannel: Int!
    bridgeid: String!
    mac: String!
    dhcp: Boolean!
    ipaddress: String!
    netmask: String!
    gateway: String!
    UTC: String!
    localtime: String!
    timezone: String!
    modelid: String!
    datastoreversion: String!
    swversion: String!
    apiversion: String!
    swupdate2: BridgeConfigSoftwareUpdate!
    linkbutton: Boolean!
    portalservices: Boolean!
    portalconnection: InternetServiceStatus!
    portalstate: BridgeConfigPortalState!
    internetservices: BridgeConfigInternetServices!
    factorynew: Boolean!
    replacesbridgeid: String
    backup: BridgeConfigBackup!
    starterkitid: String!
    whitelist: [BridgeConfigUser!]!
  }

  #########################
  ## SENSORS
  #########################
  type DaylightSensorState {
    daylight: Boolean!
    lastupdated: String!
  }

  type DaylightSensorConfig {
    on: Boolean!
    configured: Boolean!
    sunriseoffset: Int!
    sunsetoffset: Int!
  }

  type DaylightSensor {
    state: DaylightSensorState!
    config: DaylightSensorConfig!
    name: String!
    type: String!
    modelid: String!
    manufacturername: String!
    swversion: String!
  }

  type SwitchSensorState {
    buttonevent: Int!
    lastupdated: String!
  }

  type SwitchSensorConfig {
    on: Boolean!
    battery: Int!
    reachable: Boolean!
  }

  type SwitchSensorInputEvent {
    buttonevent: Int!
    eventtype: String!
  }

  type SwitchSensorInput {
    repeatintervals: [Int!]!
    events: [SwitchSensorInputEvent!]!
  }

  type SwitchSensorCapabilities {
    certified: Boolean!
    primary: Boolean!
    inputs: [SwitchSensorInput!]!
  }

  type SwitchSensor {
    state: SwitchSensorState!
    swupdate: SoftwareUpdate!
    config: SwitchSensorConfig!
    name: String!
    type: String!
    modelid: String!
    manufacturername: String!
    productname: String!
    diversityid: String!
    swversion: String!
    uniqueid: String!
    capabilities: SwitchSensorCapabilities!
  }

  type TemperatureSensorState {
    temperature: Int!
    lastupdated: String!
  }

  type TemperatureSensorConfig {
    on: Boolean!
    battery: Int!
    reachable: Boolean!
    alert: Alert!
    ledindication: Boolean!
    usertest: Boolean!
  }

  type TemperatureSensorCapabilities {
    certified: Boolean!
    primary: Boolean!
  }

  type TemperatureSensor {
    state: TemperatureSensorState!
    swupdate: SoftwareUpdate!
    config: TemperatureSensorConfig!
    name: String!
    type: String!
    modelid: String!
    manufacturername: String!
    productname: String!
    swversion: String!
    uniqueid: String!
    capabilities: TemperatureSensorCapabilities!
  }

  type PresenceSensorState {
    presence: Boolean!
    lastupdated: String!
  }

  type PresenceSensorConfig {
    on: Boolean!
    battery: Int!
    reachable: Boolean!
    alert: Alert!
    ledindication: Boolean!
    usertest: Boolean!
    sensitivity: Int!
    sensitivitymax: Int!
  }

  type PresenceSensorCapabilities {
    certified: Boolean!
    primary: Boolean!
  }

  type PresenceSensor {
    state: PresenceSensorState!
    swupdate: SoftwareUpdate!
    config: PresenceSensorConfig!
    name: String!
    type: String!
    modelid: String!
    manufacturername: String!
    productname: String!
    swversion: String!
    uniqueid: String!
    capabilities: PresenceSensorCapabilities!
  }

  type LightLevelSensorState {
    lightlevel: Int!
    dark: Boolean!
    daylight: Boolean!
    lastupdated: String!
  }

  type LightLevelSensorConfig {
    on: Boolean!
    battery: Int!
    reachable: Boolean!
    alert: Alert!
    tholddark: Int!
    tholdoffset: Int!
    ledindication: Boolean!
    usertest: Boolean!
  }

  type LightLevelSensorCapabilities {
    certified: Boolean!
    primary: Boolean!
  }

  type LightLevelSensor {
    state: LightLevelSensorState!
    swupdate: SoftwareUpdate!
    config: LightLevelSensorConfig!
    name: String!
    type: String!
    modelid: String!
    manufacturername: String!
    productname: String!
    swversion: String!
    uniqueid: String!
    capabilities: LightLevelSensorCapabilities!
  }

  union Sensor =
      DaylightSensor
    | SwitchSensor
    | TemperatureSensor
    | PresenceSensor
    | LightLevelSensor

  #########################
  ## QUERY
  #########################

  type Query {
    lights: [Light!]!
    light(id: String!): Light!
    groups: [Group!]!
    group(id: String!): Group!
    bridgeConfig: BridgeConfig!
    sensors: [Sensor!]!
  }

  #########################
  ## MUTATIONS
  #########################

  input UpdateLightState {
    on: Boolean
    bri: Int
    hue: Int
    sat: Int
    xy: [Float!]
    ct: Int
    alert: Alert
    effect: Effect
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
