import { auth } from "@/lib/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const isApiAuth = nextUrl.pathname.startsWith("/api/auth");
  const isAdminRoute = nextUrl.pathname.startsWith("/dashboard");
  if (isApiAuth) {
    return;
  }
  const isAuthRoute = ["/login", "/signup"].includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return;
  }

  //   if (!isLoggedIn && !isPublicRoute) {
  //     return Response.redirect(new URL("/login", nextUrl));
  //   }

  if (isAdminRoute && req.auth?.user.role !== "admin") {
    return Response.redirect(new URL("/", nextUrl));
  }
  return;
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
