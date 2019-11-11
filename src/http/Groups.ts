import { AxiosInstance } from "axios";
import { Group, GroupUpdate } from "../models";

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

  public fetchGroup(groupId: string): Promise<Group> {
    return this.http
      .get<ApiGroup>(`/groups/${groupId}`)
      .then(response => response.data)
      .then(group => Object.assign(group, { id: groupId }));
  }

  public updateGroup(groupId: string, updates: GroupUpdate): Promise<unknown> {
    return this.http.put(`/groups/${groupId}`, updates);
  }
}
