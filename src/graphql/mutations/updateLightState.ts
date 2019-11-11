import { LightStateUpdate, Light } from "../../models";
import { MutationResolver, NoParent } from "../types";

interface UpdateLightStateMutationArgs {
  id: string;
  state: LightStateUpdate;
}

interface Response {
  light: Light;
}

export const updateLightState: MutationResolver<
  NoParent,
  UpdateLightStateMutationArgs,
  Response
> = async (_obj, { id, state }, { services }) => {
  await services.lights.updateLightState(id, state);

  return {
    success: true,
    light: await services.lights.fetchLight(id)
  };
};
