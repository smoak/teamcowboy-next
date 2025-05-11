import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z
    .string({
      invalid_type_error: "Invalid Username",
    })
    .nonempty({
      message: "Username is required",
    }),
  password: z
    .string({
      invalid_type_error: "Invalid Password",
    })
    .nonempty({
      message: "Password is required",
    }),
});

export type SessionPayload = {
  readonly userId: string;
  readonly tcToken: string;
  readonly expiresAt: Date;
};

export type FormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const SESSION_COOKIE_NAME = "session";
