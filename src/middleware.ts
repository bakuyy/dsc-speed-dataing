import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isHomePage = request.nextUrl.pathname.startsWith('/home');
  const isLoginPage = request.nextUrl.pathname === '/';
  const isLogout = request.nextUrl.searchParams.get('logout') === 'true';

  // Skip redirect logic during logout
  if (isLogout) {
    return NextResponse.next();
  }

  // Redirect to home if user is logged in and on login page
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Redirect to login if user is not logged in and on home page
  if (isHomePage && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};