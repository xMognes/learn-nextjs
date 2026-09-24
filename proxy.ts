import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/(website)/_actions/auth";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard", "/profile"];
const publicRoutes = ["/login", "/signup"];

export default async function proxy(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const session = await getSession();

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute) {
    if (session?.userId) {
      if (
        session.userRole === "USER" &&
        req.nextUrl.pathname.startsWith("/dashboard")
      ) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
    } else {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  // 5. Redirect to /profile if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/profile")
  ) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
