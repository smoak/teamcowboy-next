import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";
import { SessionData, ironConfig } from "./lib/ironConfig";

export const middleware = async (request: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(request, res, ironConfig);
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
     * logout (logout page)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|login|logout|_next/static|favicon.ico).*)",
  ],
};
