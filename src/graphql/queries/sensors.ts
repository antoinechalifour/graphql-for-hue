import { Sensor } from "../../models";
import { QueryResolver, NoParent, NoArgs } from "../types";

export const sensors: QueryResolver<NoParent, NoArgs, Sensor[]> = (
  _obj,
  _args,
  { services }
) => services.sensors.fetchAllSensors();
