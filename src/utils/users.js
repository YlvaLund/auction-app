import axios from "axios";
import { getToken } from "./token";

export async function registerNewUser(data) {
  const res = await axios.post("https://api.noroff.dev/api/v1/auction/auth/register", data);
  return res;
}

export async function userLogin(data) {
  const res = await axios.post("https://api.noroff.dev/api/v1/auction/auth/login", data);
  return res;
}

export function hasNoWhitespaces(str) {
  return !/\s/.test(str);
}

export async function getAllUsers(offset) {
  const res = await axios.get("https://api.noroff.dev/api/v1/auction/profiles?limit=100&_listings=true&offset=" + offset, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return res;
}

export async function getUser(name) {
  if (!name) {
    return;
  }
  const res = await axios.get("https://api.noroff.dev/api/v1/auction/profiles/" + name + "?_listings=true", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return res;
}

export async function putNewAvatar(name, img) {
  if (!img) return;

  const inputData = {
    avatar: img,
  };

  const res = await axios.put("https://api.noroff.dev/api/v1/auction/profiles/" + name + "/media", inputData, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

  return res;
}
