import { Group, LightStateUpdate } from "../../models";
import { MutationResolver, NoParent } from "../types";

interface SetGroupStateMutationArgs {
  id: string;
  state: LightStateUpdate;
}

interface Response {
  group: Group;
}

export const setGroupState: MutationResolver<
  NoParent,
  SetGroupStateMutationArgs,
  Response
> = async (_obj, { id, state }, { services }) => {
  await services.groups.setGroupState(id, state);

  return {
    success: true,
    group: await services.groups.fetchGroup(id)
  };
};
