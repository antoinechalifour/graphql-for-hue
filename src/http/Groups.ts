import { AxiosInstance } from "axios";
import { Group, GroupUpdate, LightStateUpdate, CreateGroup } from "../models";

type ApiGroup = Omit<Group, "id">;

interface AllGroupsResponse {
  [id: string]: ApiGroup;
}

interface CreateGroupResponse {
  id: string;
}

type ApiCreateGroupResponse = Array<{
  success?: { id: string };
  error?: {
    description: string;
  };
}>;

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

  public setGroupState(
    groupId: string,
    state: LightStateUpdate
  ): Promise<unknown> {
    return this.http.put(`/groups/${groupId}/action`, state);
  }

  public createGroup(attributes: CreateGroup): Promise<CreateGroupResponse> {
    return this.http
      .post<ApiCreateGroupResponse>("/groups", attributes)
      .then(response => response.data[0])
      .then(response => {
        if (response.error) {
          throw new Error(response.error.description);
        }

        return response.success!;
      })
      .then(response => ({
        id: response.id
      }));
  }
}
