import { API_ENDPOINTS, API_ENDPOINTS_DOSEN } from "@/services/api/api-config";
import { PenelitianType } from "./schema/penelitian-schema";
import { DosenData, DosenResponse } from "../../dosen.interface";
import { ListPenelitianResponse } from "@/modules/listdata/penelitian.list.interface";
import { ListIndeksasiResponse } from "@/modules/listdata/indeksasi.list.interface";
import { ListPengabdianResponse } from "@/modules/listdata/pengabdian.list.interface";
import { PenelitianDosenData } from "./penelitian-dosen.interface";
import { getData, postData } from "@/services/api/http";

export async function getPenelitianDosen(page: number, search: string) {
  const response: DosenResponse<PenelitianDosenData> = await getData(
    API_ENDPOINTS_DOSEN.PENELITIAN,
    { page, search },
  );
  return response.data;
}

export async function createPenelitianDosen(data: PenelitianType) {
  const response = await postData(API_ENDPOINTS_DOSEN.PENELITIAN, data);
  return response;
}

export async function getAnggota(page: number, search: string) {
  const response: DosenResponse<DosenData> = await getData(
    API_ENDPOINTS.ANGGOTA,
    { page, search },
  );
  return response.data;
}

export async function getListPenelitian() {
  const response: ListPenelitianResponse = await getData(
    API_ENDPOINTS.LIST_PENELITIAN,
  );
  return response;
}

export async function getListIndeksasi() {
  const response: ListIndeksasiResponse = await getData(
    API_ENDPOINTS.LIST_INDEKSASI,
  );
  return response;
}

export async function getListPengabdian() {
  const response: ListPengabdianResponse = await getData(
    API_ENDPOINTS.LIST_PENGABDIAN,
  );
  return response;
}
