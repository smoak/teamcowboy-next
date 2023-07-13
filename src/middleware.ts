import { getIronSession } from "iron-session/edge";
import { NextRequest, NextResponse } from "next/server";
import { ironConfig } from "./lib/ironConfig";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      token: string;
    };
  }
}

export const middleware = async (request: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(request, res, ironConfig);
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
