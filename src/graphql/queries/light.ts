import { Light } from "../../models";
import { QueryResolver, NoParent } from "../types";

interface LightQueryArgs {
  id: string;
}

export const light: QueryResolver<NoParent, LightQueryArgs, Light> = (
  _obj,
  { id },
  { services }
) => services.lights.fetchLight(id);
