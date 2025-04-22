import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl;
    
    // Si el usuario está autenticado y trata de ir a "/login", lo redirige al home "/"
    if (req.nextauth.token && url.pathname === "/auth") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Solo los usuarios autenticados tendrán un token
    },
  }
);

export const config = {
  matcher: ["/auth"], // Rutas donde aplicará el middleware
};
