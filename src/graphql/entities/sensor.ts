import { Sensor } from "../../models";

export const sensor = {
  __resolveType: (sensor: Sensor) => {
    switch (sensor.type) {
      case "Daylight":
        return "DaylightSensor";

      case "ZLLLightLevel":
        return "LightLevelSensor";

      case "ZLLPresence":
        return "PresenceSensor";

      case "ZLLSwitch":
        return "SwitchSensor";

      case "ZLLTemperature":
        return "TemperatureSensor";
    }
  }
};
