import { LightsHttp } from "../http/Lights";
import { GroupsHttp } from "../http/Groups";

export interface GraphqlContext {
  services: {
    lights: LightsHttp;
    groups: GroupsHttp;
  };
}

export type NoParent = unknown;
export type NoArgs = {};

export type EntityResolver<T, R> = (
  obj: T,
  args: {},
  ctx: GraphqlContext
) => Promise<R>;

export type QueryResolver<T, U, R> = (
  obj: T,
  args: U,
  ctx: GraphqlContext
) => Promise<R>;

export type MutationResponse<R> = {
  success: boolean;
} & R;

export type MutationResolver<T, U, R> = (
  obj: T,
  args: U,
  ctx: GraphqlContext
) => Promise<MutationResponse<R>>;
