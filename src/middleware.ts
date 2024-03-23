import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get("authToken")?.value || "";

  const isPublicPath = path === "/" || path === "/login" || path === "/signup";
  const isProtectedPath = path === "/interests";

  if (isPublicPath && authToken)
    return NextResponse.redirect(new URL("/interests", request.nextUrl));
  else if (!authToken && isProtectedPath)
    return NextResponse.redirect(new URL("/", request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/interests"],
};
