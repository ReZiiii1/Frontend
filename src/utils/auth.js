export function isLoggedIn() {
  return !!localStorage.getItem('manticore_token');
}

export function getUserEmail() {
  return localStorage.getItem('manticore_user') || '';
}

export function saveAuth({ token, email }) {
  localStorage.setItem('manticore_token', token);
  localStorage.setItem('manticore_user', email);
}

export function clearAuth() {
  localStorage.removeItem('manticore_token');
  localStorage.removeItem('manticore_user');
}

export function getAuthHeaders() {
  const token = localStorage.getItem('manticore_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}