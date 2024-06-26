import { clearSessionData } from "@/lib/session";
import { cookies } from "next/headers";

export const GET = async () => {
  await clearSessionData(cookies());
  return new Response("Success!", {
    status: 200,
  });
};
