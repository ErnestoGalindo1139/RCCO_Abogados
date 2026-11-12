import { API_URL } from '../../config/api';

export const apiFetch: typeof fetch = async (input, init = {}) => {
  const headers = new Headers(init.headers);
  const token = sessionStorage.getItem('rcco_session');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(input, { ...init, headers });
  if (response.status === 401) {
    sessionStorage.removeItem('rcco_session');
    localStorage.removeItem('rcco_user_logged');
    localStorage.removeItem('rcco_role');
  }
  return response;
};

export async function loginSession(usuario: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password }),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || 'No fue posible iniciar sesión.');
  sessionStorage.setItem('rcco_session', data.token);
  localStorage.setItem('rcco_user_logged', 'true');
  localStorage.setItem('rcco_role', data.role);
  return data.role as string;
}

export function logoutSession() {
  void apiFetch(`${API_URL}/auth/logout`, { method: 'POST' }).catch(() => {});
  sessionStorage.removeItem('rcco_session');
  localStorage.removeItem('rcco_user_logged');
  localStorage.removeItem('rcco_role');
}
