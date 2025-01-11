import { Meta } from "@/interface/type";

export interface PenelitianDosenData {
  penelitian: PenelitianDosen[];
  meta: Meta;
}

export type Status = "accepted" | "rejected" | "pending" | "draft";

export interface StatusPenelitian {
  kaprodi: Status;
  dppm: Status;
  keuangan: Status;
}

export interface PenelitianDosen {
  id: string;
  title: string;
  lead: string;
  field: string;
  tahun_akademik: string;
  created_at: string;
  status: StatusPenelitian[];
}

export interface PenelitianDosenResponse<T> extends Response {
  data: T;
}
