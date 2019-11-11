import { Group } from "../../models";
import { MutationResolver, NoParent } from "../types";

interface RenameGroupMutationArgs {
  id: string;
  name: string;
}

interface Response {
  group: Group;
}

export const renameGroup: MutationResolver<
  NoParent,
  RenameGroupMutationArgs,
  Response
> = async (_obj, { id, name }, { services }) => {
  await services.groups.updateGroup(id, { name });

  return {
    success: true,
    group: await services.groups.fetchGroup(id)
  };
};
