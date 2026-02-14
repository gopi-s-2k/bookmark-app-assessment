import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const token = req.nextauth.token;
        if (!token && pathname === "/login") {
            return NextResponse.next();
        }

        if (!token && pathname.startsWith("/bookmarks")) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
        if (pathname === "/login") {
            return NextResponse.redirect(new URL("/bookmarks", req.url))
        }
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: () => true,
        }
    }
)

export const config = {
    matcher: [
        "/bookmarks",
        "/bookmarks/:path*",
        "/login",
    ],
};