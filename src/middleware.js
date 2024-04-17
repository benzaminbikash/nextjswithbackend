import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const publicpath =
    path === "/login" || path === "/register" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";
  console.log(token);
  if (publicpath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!publicpath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login", "/register", "/profile", "/verifyemail"],
};
