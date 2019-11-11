import { LightsHttp } from "../http/Lights";

export interface GraphqlContext {
  services: {
    lights: LightsHttp;
  };
}

export type NoParent = undefined;
export type NoArgs = {};

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
