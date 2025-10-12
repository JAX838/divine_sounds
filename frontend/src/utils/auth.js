export function getAdminToken() {
  return localStorage.getItem("adminToken");
}

export function isAdminLoggedIn() {
  return !!getAdminToken();
}

export function logoutAdmin() {
  localStorage.removeItem("adminToken");
}
