import { Response } from "@/interface/type";

export interface PengabdianData {
  id: string;
  name: string;
  kriteria: string[];
  keterangan: string;
}

export interface ListPengabdianResponse extends Response {
  data: PengabdianData[];
}
