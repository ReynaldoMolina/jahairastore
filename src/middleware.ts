import { NextResponse, NextRequest } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export const isDemo = process.env.NEXT_PUBLIC_APP_MODE === 'demo';

const publicRoutes = ['/auth/login'];

export async function middleware(request: NextRequest) {
  if (isDemo) return NextResponse.next();

  const { pathname } = new URL(request.url);

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const matcher = [
  '/((?!api|_next|favicon.ico|robots.txt|.*\\.(?:png|jpg|jpeg|svg|ico|webp)$).*)',
];
