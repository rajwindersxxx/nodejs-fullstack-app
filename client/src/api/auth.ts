import { baseUrl } from "../config/apiConfig";
import { postRequest } from "../helper/apiHelper";
import type { changePassword, Login, SignUp } from "../types/auth.type";

const authUrl = `${baseUrl}/api/v1/auth`;

export async function loginUser(data: Login) {
  return await postRequest({
    url: `${authUrl}/login`,
    data,
  });
}
export async function signUp(data: SignUp) {
  return await postRequest({
    url: `${authUrl}/SignUp`,
    data,
  });
}
export async function logoutUser() {
  return await postRequest({
    url: `${authUrl}/logout`,
    data: null,
  });
}

export async function changePassword(data: changePassword) {
  return await postRequest({
    url: `${authUrl}/logout`,
    data: data,
  });
}
export async function getAuthDetails() {
  const res = await fetch(`${authUrl}/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");

  return res.json();
}
