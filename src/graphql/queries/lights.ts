import { Light } from "../../models";
import { QueryResolver, NoParent, NoArgs } from "../types";

export const lights: QueryResolver<NoParent, NoArgs, Light[]> = (
  _obj,
  _args,
  { services }
) => services.lights.fetchAllLights();
