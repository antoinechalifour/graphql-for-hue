import { AxiosInstance } from "axios";

const APPLICATION_NAME = "g4h#server";

type CreateUserResponse = Array<{
  success?: {
    username: string;
  };
  error?: {
    type: 101;
    description: string;
  };
}>;

export class UserHttp {
  public constructor(private http: AxiosInstance) {}

  public createUser(): Promise<{ userName: string }> {
    return this.http
      .post<CreateUserResponse>("/", {
        devicetype: APPLICATION_NAME
      })
      .then(response => response.data[0])
      .then(response => {
        if (response.error) {
          throw new Error(response.error.description);
        }

        return { userName: response.success!.username };
      });
  }
}
