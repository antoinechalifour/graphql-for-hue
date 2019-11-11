import { AxiosInstance } from "axios";
import { Group } from "../models";

type ApiGroup = Omit<Group, "id">;

interface AllGroupsResponse {
  [id: string]: ApiGroup;
}

export class GroupsHttp {
  public constructor(private http: AxiosInstance) {}

  public fetchAllGroups(): Promise<Group[]> {
    return this.http
      .get<AllGroupsResponse>("/groups")
      .then(response => response.data)
      .then(groups =>
        Object.keys(groups).map(id => ({
          id,
          ...groups[id]
        }))
      );
  }
}
