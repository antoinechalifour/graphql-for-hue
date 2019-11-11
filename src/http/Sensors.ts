import { AxiosInstance } from "axios";

import { Sensor } from "../models";

type ApiSensor = Omit<Sensor, "id"> | { type: string };

interface ApiSensorsResponse {
  [id: string]: ApiSensor;
}

const SUPPORTED_SENSORS: Sensor["type"][] = [
  "Daylight",
  "ZLLLightLevel",
  "ZLLPresence",
  "ZLLSwitch",
  "ZLLTemperature"
];

function isSupportedSensor(sensor: ApiSensor): sensor is Sensor {
  return (SUPPORTED_SENSORS as string[]).includes(sensor.type);
}

export class SensorsHttp {
  public constructor(private http: AxiosInstance) {}

  public fetchAllSensors(): Promise<ApiSensor[]> {
    return this.http
      .get<ApiSensorsResponse>("/sensors")
      .then(response => response.data)
      .then(response =>
        Object.keys(response).map(id => ({
          id,
          ...response[id]
        }))
      )
      .then(sensors => sensors.filter(isSupportedSensor));
  }
}
