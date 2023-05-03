export function storeUser(token, userName, credits) {
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("userName", userName);
  window.localStorage.setItem("credits", credits);
}

export function destroyToken() {
  window.localStorage.clear();
}

export function getToken() {
  const token = window.localStorage.getItem("token");
  return token;
}

export function getUserDetails() {
  const userName = window.localStorage.getItem("userName");
  const credits = window.localStorage.getItem("credits");
  return [userName, credits];
}
