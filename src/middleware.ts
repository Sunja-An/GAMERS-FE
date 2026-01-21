import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only intercept requests starting with /api/proxy
  if (request.nextUrl.pathname.startsWith('/api/proxy')) {
    console.log('[Middleware] Intercepted:', request.nextUrl.pathname);
    const accessToken = request.cookies.get('access_token')?.value;
    
    // Construct the backend URL
    // Remove /api/proxy from the path and append to backend API URL
    // Example: /api/proxy/users/me -> http://backend:8080/api/users/me
    const path = request.nextUrl.pathname.replace('/api/proxy', '');
    const searchParams = request.nextUrl.search;
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
    const targetUrl = `${backendUrl}${path}${searchParams}`;

    console.log('[Middleware] Target URL:', targetUrl);

    // Create headers for the forwarded request
    const requestHeaders = new Headers(request.headers);
    if (accessToken) {
      requestHeaders.set('Authorization', `Bearer ${accessToken}`);
      console.log('[Middleware] Injected Authorization Header');
    } else {
      console.log('[Middleware] No Access Token found in cookies');
    }
    
    // We cannot use 'fetch' directly in middleware to return the response body streaming properly 
    // without some limitations in older Next.js, but rewrite is better.
    // However, rewrite doesn't allow adding headers to the *outgoing* request easily visible to the backend
    // unless we use a custom server or modifying headers on the fly.
    // Next.js Middleware 'rewrite' preserves the original headers but we can modify request headers.
    
    // Valid approach: Rewrite with modified headers?
    // request.headers is readonly in some contexts.
    // NextResponse.rewrite(url, { request: { headers: ... } }) is the way.

    return NextResponse.rewrite(new URL(targetUrl), {
      request: {
        headers: requestHeaders,
      },
    });
  }
}

export const config = {
  matcher: '/api/proxy/:path*',
};
