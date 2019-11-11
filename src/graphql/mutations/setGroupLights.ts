import { Group } from "../../models";
import { MutationResolver, NoParent } from "../types";

interface SetGroupLightsMutationArgs {
  id: string;
  lightIds: string[];
}

interface Response {
  group: Group;
}

export const setGroupLights: MutationResolver<
  NoParent,
  SetGroupLightsMutationArgs,
  Response
> = async (_obj, { id, lightIds }, { services }) => {
  await services.groups.updateGroup(id, { lights: lightIds });

  return {
    success: true,
    group: await services.groups.fetchGroup(id)
  };
};
