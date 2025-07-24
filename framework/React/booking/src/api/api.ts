import type { Booking, AuthResponse } from './model';

const BASE_URL = '/booker';

let authToken: string | null = localStorage.getItem('token');

export function setAuthToken(token: string) {
  authToken = token;
  localStorage.setItem('token', token);
}

async function fetchWithAuth(input: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  if (authToken) headers.set('Authorization', `Bearer ${authToken}`);

  const response = await fetch(input, { ...init, headers });
  
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API error: ${response.status}`);
  }
  return response;
}

export async function authenticate(username: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status}`);
    }

    const data: AuthResponse = await response.json();
    
    if (!data.token) {
      throw new Error('No token received');
    }

    setAuthToken(data.token);
    return data;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

export async function createBooking(booking: Booking): Promise<Booking> {
  const response = await fetchWithAuth(`${BASE_URL}/booking`, {
    method: 'POST',
    body: JSON.stringify(booking),
  });
  return response.json();
}

export async function updateBooking(
  id: number, 
  booking: Booking, 
  token: string
): Promise<Booking> {
  const response = await fetch(`${BASE_URL}/booking/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Update failed: ${response.status}`);
  }

  return response.json();
}

export async function deleteBooking(id: number): Promise<void> {
  await fetchWithAuth(`${BASE_URL}/booking/${id}`, {
    method: 'DELETE',
  });
}
