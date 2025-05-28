import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/';

  // redirect to home page if user is logged in and on login page
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // redirect to login page if user is not logged in and on home page
  if (!isLoginPage && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 