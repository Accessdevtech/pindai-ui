import { Response } from "@/interface/type";

export interface Prodi {
  id: string;
  name: string;
}

export interface ProdiResponse extends Response {
  data: Prodi[];
}
