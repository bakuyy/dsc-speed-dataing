import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/';
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/');

  // Don't apply middleware to API routes
  if (isApiRoute) {
    return NextResponse.next();
  }

  // If user is not logged in and trying to access a protected page, redirect to login
  if (!token && !isLoginPage) {
    console.log('[Middleware] No token found, redirecting to login');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is logged in and on login page, redirect to dashboard
  if (token && isLoginPage) {
    console.log('[Middleware] User logged in, redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 