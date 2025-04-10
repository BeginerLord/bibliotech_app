import { PrivateRoutes, PublicRoutes } from "@/cosntants/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  // Rutas privadas
  const privateRoutes = Object.values(PrivateRoutes);

  // Si el usuario intenta acceder a una ruta privada sin un token, redirigir al login
  if (privateRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL(PublicRoutes.LOGIN, request.url));
    }
  }

  // Si el usuario está autenticado, evitar que acceda a rutas públicas como login o signup
  const publicRoutes = Object.values(PublicRoutes);
  if (publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL(PrivateRoutes.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

// Configurar las rutas donde se aplica el middleware
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*", "/Auth/:path*"],
};