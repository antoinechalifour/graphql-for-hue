import { Light } from "../../models";
import { MutationResolver, NoParent } from "../types";

interface RenameLightMutationArgs {
  id: string;
  name: string;
}

interface Response {
  light: Light;
}

export const renameLight: MutationResolver<
  NoParent,
  RenameLightMutationArgs,
  Response
> = async (_obj, { id, name }, { services }) => {
  await services.lights.renameLight(id, name);

  return {
    success: true,
    light: await services.lights.fetchLight(id)
  };
};
