import { Response } from "@/interface/type"

export interface LuaranData {
  id: string
  name: string
}

export interface listLuaranResponse extends Response {
  data: LuaranData[]
}
