import { AxiosInstance } from "axios";

import { Light } from "../../src/models";

interface AllLightsResponse {
  [id: string]: Omit<Light, "id">;
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
}
