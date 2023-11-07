import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";

export async function login(creds, redirect = "/") {
  try {
    const token = await loginRequest(creds);
    setLocalStorage(tokenKey, token);
    // because of the default arg provided above...if no redirect is provided send them Home.
    window.location = redirect;
  } catch (err) {
    alertMessage(err.message.message);
  }
}

export function checkLogin() {
  const token = getLocalStorage(tokenKey);
  const valid = isTokenValid(token);
  if (!valid) {
    localStorage.removeItem(tokenKey);
    const location = window.location;
    console.log(location);
    window.location = `/login/index.html?redirect=${location.pathname}`;
  } else return token;
}

export function isTokenValid(token) {
  if (token) {
    const decodeToken = jwtDecode(token);
    const currentdate = new Date();
    if (decodeToken.exp * 1000 < currentdate.getTime()) {
      console.log("Token is expired");
      return false;
    } else {
      console.log("Token is valid");
      return true;
    }
  } else return false;
}
