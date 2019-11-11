import { Group, Light } from "../../models";
import { EntityResolver } from "../types";

interface GroupResolver {
  lights: EntityResolver<Group, Light[]>;
}

export const group: GroupResolver = {
  lights: (group, _args, { services }) =>
    Promise.all(
      group.lights.map(lightId => services.lights.fetchLight(lightId))
    )
};
