import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const isDemo = process.env.NEXT_PUBLIC_APP_MODE === 'demo';

export default function middleware(req) {
  if (isDemo) {
    return NextResponse.next();
  }

  return NextAuth(authConfig).auth(req);
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico|robots.txt|.*\\.(?:png|jpg|jpeg|svg|ico|webp)$).*)',
  ],
};
