import { Group, CreateGroup } from "../../models";
import { MutationResolver, NoParent } from "../types";

interface CreateGroupMutationArgs {
  attributes: CreateGroup;
}

interface Response {
  group: Group;
}

export const createGroup: MutationResolver<
  NoParent,
  CreateGroupMutationArgs,
  Response
> = async (_obj, { attributes }, { services }) => {
  const { id } = await services.groups.createGroup(attributes);

  return {
    success: true,
    group: await services.groups.fetchGroup(id)
  };
};
