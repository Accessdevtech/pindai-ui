import { ProfileType } from "./profile.schema";
import { API_ENDPOINTS } from "@/services/api/api-config";
import { Response } from "@/interface/type";
import axiosInstance from "@/services/api/axios-instance";

export async function updateProfile(data: ProfileType) {
  const response: Response = await axiosInstance.put(
    API_ENDPOINTS.PROFILE,
    data,
  );
  return response;
}
