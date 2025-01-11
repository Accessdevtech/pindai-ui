import { Response } from "@/interface/type";

export interface Auth {
  access_token: string;
  token_type: string;
  user: string;
}

export interface AuthResponse<T> extends Response {
  data: T;
}
