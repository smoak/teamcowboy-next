declare module "teamcowboy" {
  type TCResponse = {
    readonly success: boolean;
    readonly requestSecs: number;
    readonly body: unknown;
  };

  type SuccessResponse<T> = TCResponse & {
    readonly success: true;
    readonly body: T;
  };

  type ErrorResponse = TCResponse & {
    readonly success: false;
    readonly body: {
      readonly errorCode: string;
      readonly httpResponse: number;
      readonly message: string;
    };
  };

  type GetUserTokenResponse =
    | SuccessResponse<{ readonly userId: number; token: string }>
    | ErrorResponse;

  type Auth = {
    getUserToken: (data: {
      username: string;
      password: string;
    }) => Promise<GetUserTokenResponse>;
  };
  type Api = {
    readonly auth: Auth;
  };
  type TeamcowboyOptions = {
    readonly publicKey: string;
    readonly privateKey: string;
  };
  type teamcowboy = (options: TeamcowboyOptions) => unknown;
  export = (options: TeamcowboyOptions): Api => {};
}
