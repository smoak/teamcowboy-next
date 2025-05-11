import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "./app/lib/definitions";
import { decrypt } from "./app/lib/session";

export const middleware = async (request: NextRequest) => {
  const sessionCookieValue = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await decrypt(sessionCookieValue);

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
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
