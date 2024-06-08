export const ironConfig = {
  cookieName: "leaguewrangler_auth",
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export type SessionData = {
  user?: {
    readonly id: number;
    readonly token: string;
  };
};
