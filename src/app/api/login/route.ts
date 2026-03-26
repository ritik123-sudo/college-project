import { NextResponse } from 'next/server';

// 10 Dummy Client Accounts
const VALID_USERS = [
  { username: 'admin', password: 'password123' },
  { username: 'client_alpha', password: 'alpha2026' },
  { username: 'client_beta', password: 'beta2026' },
  { username: 'sarah_coffee', password: 'beans456' },
  { username: 'mike_retail', password: 'store789' },
  { username: 'tech_startup', password: 'cloud101' },
  { username: 'demo_user', password: 'demo' },
  { username: 'saniya_admin', password: 'secure1' },
  { username: 'test_account', password: 'test' },
  { username: 'guest', password: 'guestpassword' }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Check if the user exists and password matches
    const user = VALID_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Success! In a real app, you would generate a JWT token here.
      return NextResponse.json(
        { message: 'Login successful', user: user.username },
        { status: 200 }
      );
    } else {
      // Failed login
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}