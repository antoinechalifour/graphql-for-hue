import { AxiosInstance } from "axios";

import { Light, LightStateUpdate } from "../../src/models";

type ApiLight = Omit<Light, "id">;

interface AllLightsResponse {
  [id: string]: ApiLight;
}

export class LightsHttp {
  public constructor(private http: AxiosInstance) {}

  public fetchAllLights(): Promise<Light[]> {
    return this.http
      .get<AllLightsResponse>("/lights")
      .then(response => response.data)
      .then(response =>
        Object.keys(response).map(id => ({
          id,
          ...response[id]
        }))
      );
  }

  public fetchLight(lightId: string): Promise<Light> {
    return this.http
      .get<ApiLight>(`/lights/${lightId}`)
      .then(response => response.data)
      .then(response => Object.assign(response, { id: lightId }));
  }

  public renameLight(lightId: string, name: string): Promise<unknown> {
    return this.http.put(`/lights/${lightId}`, { name });
  }

  public updateLightState(
    lightId: string,
    state: LightStateUpdate
  ): Promise<unknown> {
    return this.http.put(`/lights/${lightId}/state`, state);
  }
}
