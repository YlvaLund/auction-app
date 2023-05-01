export function storeToken(token) {
  window.localStorage.setItem("token", token);
}

export function destroyToken() {
  window.localStorage.clear();
}

export function getToken() {
  const token = window.localStorage.getItem("token");
  return token;
}
