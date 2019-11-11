import { Group } from "../../models";
import { QueryResolver, NoParent } from "../types";

interface GroupQueryArgs {
  id: string;
}

export const group: QueryResolver<NoParent, GroupQueryArgs, Group> = (
  _obj,
  { id },
  { services }
) => services.groups.fetchGroup(id);
