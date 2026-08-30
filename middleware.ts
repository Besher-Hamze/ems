import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const isLogin = path.startsWith("/admin/login");
  const isAdmin = path.startsWith("/admin");
  const isUpload = path.startsWith("/api/upload");

  if ((isAdmin && !isLogin) || isUpload) {
    if (!req.auth) {
      if (path.startsWith("/api/")) {
        return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }
  }

  if (isLogin && req.auth) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/api/upload"],
};
