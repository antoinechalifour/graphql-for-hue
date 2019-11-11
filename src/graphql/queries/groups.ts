import { Group } from "../../models";
import { QueryResolver, NoParent, NoArgs } from "../types";

export const groups: QueryResolver<NoParent, NoArgs, Group[]> = (
  _obj,
  _args,
  { services }
) => services.groups.fetchAllGroups();
