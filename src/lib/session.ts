import { unsealData } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, ironConfig } from "./ironConfig";

type ReadonlyRequestCookies = ReturnType<typeof cookies>;
export const getSessionData = async (
  cookies: ReadonlyRequestCookies
): Promise<SessionData> => {
  const seal = cookies.get(ironConfig.cookieName)?.value;

  if (!seal) {
    return {};
  }

  return unsealData(seal, ironConfig);
};
