import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;
  const adminVerified = request.cookies.get('adminVerified')?.value;
  const isLoginPage = pathname === '/';
  const isApiRoute = pathname.startsWith('/api/');
  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminVerifyRoute = pathname === '/admin/verify';

  console.log('[Middleware] Path:', pathname, 'Token:', token ? 'present' : 'not found', 'Role:', role, 'AdminVerified:', adminVerified);

  // Don't apply middleware to API routes
  if (isApiRoute) {
    return NextResponse.next();
  }

  // Handle admin routes
  if (isAdminRoute && !isAdminVerifyRoute) {
    console.log('[Middleware] Admin route detected');
    if (!token) {
      console.log('[Middleware] No token found for admin route, redirecting to login');
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (role !== 'admin') {
      console.log('[Middleware] User is not admin (role:', role, '), redirecting to dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (!adminVerified) {
      console.log('[Middleware] Admin not verified, redirecting to verification page');
      return NextResponse.redirect(new URL('/admin/verify', request.url));
    }
    console.log('[Middleware] Admin access granted');
    return NextResponse.next();
  }

  // Handle admin verification route
  if (isAdminVerifyRoute) {
    console.log('[Middleware] Admin verify route detected');
    if (!token) {
      console.log('[Middleware] No token found for admin verify route, redirecting to login');
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (role !== 'admin') {
      console.log('[Middleware] User is not admin, redirecting to dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (adminVerified) {
      console.log('[Middleware] Admin already verified, redirecting to admin panel');
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    console.log('[Middleware] Admin verification access granted');
    return NextResponse.next();
  }

  if (!token && !isLoginPage) {
    console.log('[Middleware] No token found, redirecting to login');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is logged in and on login page, redirect to appropriate page
  if (token && isLoginPage) {
    console.log('[Middleware] User logged in, redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 