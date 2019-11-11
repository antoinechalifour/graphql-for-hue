import { Group, GroupClass } from "../../models";
import { MutationResolver, NoParent } from "../types";

interface SetGroupClassMutationArgs {
  id: string;
  class: GroupClass;
}

interface Response {
  group: Group;
}

export const setGroupClass: MutationResolver<
  NoParent,
  SetGroupClassMutationArgs,
  Response
> = async (_obj, { id, class: groupClass }, { services }) => {
  await services.groups.updateGroup(id, { class: groupClass });

  return {
    success: true,
    group: await services.groups.fetchGroup(id)
  };
};
