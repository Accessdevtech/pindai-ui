import { StatusData } from "@/interface/type"
import { atom } from "jotai"
import { AnggotaSchemaType } from "../schema/dosen-schema"

export const anggotaAtom = atom<AnggotaSchemaType[]>([])
export const selectedAnggotaAtom = atom<string[]>([])
export const isDialogOpenAtom = atom<boolean>(false)
export const isDialogOpenManualAtom = atom<boolean>(false)
export const statusAtom = atom<StatusData>()
export const penelitianIdAtom = atom<string>("")
