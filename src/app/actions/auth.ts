"use server";
import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { FormState, LoginFormSchema } from "@/app/lib/definitions";
import { teamCowboy } from "../lib/teamcowboy/api";

export const authenticate = async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validatedFields.data;

  const tokenResponse = await teamCowboy.Auth.getUserToken({
    password,
    username,
  });

  if (!tokenResponse.success) {
    return {
      message: "Invalid username or password",
    };
  }

  createSession({
    tcToken: tokenResponse.body.token,
    userId: tokenResponse.body.userId,
  });
  redirect("/");
};

export const logout = async () => {
  await deleteSession();
  redirect("/login");
};
