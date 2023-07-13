import { getIronSession } from "iron-session/edge";
import { NextRequest, NextResponse } from "next/server";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

export const middleware = async (request: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(request, res, {
    cookieName: "leaguewrangler_auth",
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
  const { user } = session;

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return res;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * login (login page)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|login|_next/static|favicon.ico).*)",
  ],
};
