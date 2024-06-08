"use server";

import { redirect } from "next/navigation";
import { teamCowboy } from "./teamcowboy/api";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, ironConfig } from "./ironConfig";
import { revalidatePath } from "next/cache";

export const authenticate = async (formData: FormData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) {
    throw new Error("uh oh!");
  }

  const tokenResponse = await teamCowboy.Auth.getUserToken({
    password: password.toString(),
    username: username.toString(),
  });
  const session = await getIronSession<SessionData>(cookies(), ironConfig);
  session.user = {
    id: parseInt(tokenResponse.body.userId),
    token: tokenResponse.body.token,
  };
  await session.save();

  revalidatePath("/login");
};
