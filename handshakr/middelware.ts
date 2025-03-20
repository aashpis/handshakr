import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import API from 'lib/definitions'

// Define protected routes
const protectedRoutes = ["/dashboard", "/handshakes", "/history"];

// API Base URL (Placeholder)

// Middleware function
export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const cookieStore = await cookies(); // Await the cookies() call
  const jwt = cookieStore.get("jwt_token")?.value; // Read JWT from httpOnly cookie

  // Check if the request is for a protected route
  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    if (!jwt) {
      // Redirect to login if user is not authenticated
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Fetch CSRF token from backend
      //TODO: store it locally instead?
      const csrfRes = await fetch(API.BASE/API.csrf-token, {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `access_token=${jwt}`, // Send JWT in cookies
        },
      });

      if (!csrfRes.ok) {
        throw new Error("Failed to fetch CSRF token");
      }

      const { csrfToken } = await csrfRes.json();

      // Attach JWT & CSRF token to request headers
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("Authorization", `Bearer ${jwt}`);
      requestHeaders.set("X-CSRF-Token", csrfToken);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Middleware auth error:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
