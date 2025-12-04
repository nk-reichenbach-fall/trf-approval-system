import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Came inside auth");

  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: "/forms/:path*",
};
