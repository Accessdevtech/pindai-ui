import { Response } from "@/interface/type";

export interface DppmDashboardFakultasResopnse extends Response {
  data: DppmDashboardFakultas;
}

export interface DppmDashboardFakultas {
  fakultas: Fakultas[];
}

export interface Fakultas {
  id: string;
  name: string;
  dosen_count?: number;
}

export interface DppmResponse<T> extends Response {
  data: T;
}
