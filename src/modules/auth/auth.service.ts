"use server";
import { postData } from "@/services/api/http";
import { API_ENDPOINTS } from "@/services/api/api-config";
import { RegisterType } from "./schema/register.schema";
import {
  getCookieDecrypted,
  removeCookie,
} from "@/services/storage/cookie-storage-service";

export async function register(data: RegisterType) {
  return await postData(API_ENDPOINTS.REGISTER, data).catch((err) =>
    console.log(err),
  );
}

export async function logoutAction() {
  const response = await postData(API_ENDPOINTS.LOGOUT, {});
  await removeCookie("token");
  await removeCookie("user");
  return response.data;
}

export async function getCurrentUser() {
  const userCookie = await getCookieDecrypted("user");
  if (!userCookie) return null;

  try {
    return userCookie;
  } catch (error) {
    return null;
  }
}
