import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: 'No refresh token' }, { status: 401 });
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
        // If refresh fails, clear cookies
        const errorRes = NextResponse.json({ message: 'Refresh failed' }, { status: 401 });
        errorRes.cookies.delete('access_token');
        errorRes.cookies.delete('refresh_token');
        return errorRes;
    }

    const data = await response.json();
    // Assuming data.data.access_token exists
    // Adjust based on your actual Refresh Response structure (verified in previous steps)
    // Previous step showed usage: refreshData.data?.access_token
    const newAccessToken = data.data?.access_token || data.access_token;
    const newRefreshToken = data.data?.refresh_token || data.refresh_token || refreshToken; // Use old if not rotated

    if (!newAccessToken) {
        return NextResponse.json({ message: 'Invalid refresh response' }, { status: 401 });
    }

    const successRes = NextResponse.json({ message: 'Refreshed' }, { status: 200 });

    // Set new cookies
    successRes.cookies.set('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 // 1 day
    });

    if (newRefreshToken) {
        successRes.cookies.set('refresh_token', newRefreshToken, {
             httpOnly: true,
             secure: process.env.NODE_ENV === 'production',
             path: '/',
             maxAge: 60 * 60 * 24 * 7 // 7 days
        });
    }

    return successRes;

  } catch (error) {
    console.error('Refresh Proxy Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', status: 500 },
      { status: 500 }
    );
  }
}
