import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SESSION_COOKIE_NAME, SessionPayload } from "@/app/lib/definitions";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export const encrypt = async (payload: SessionPayload) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

export const decrypt = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
};

type CreateSessionOptions = {
  readonly userId: string;
  readonly tcToken: string;
};
export const createSession = async ({
  tcToken,
  userId,
}: CreateSessionOptions) => {
  const expiresAt = createExpiration();
  const session = await encrypt({ userId, tcToken, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const updateSession = async () => {
  const session = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = createExpiration();

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
};

export const createExpiration = () =>
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
};
