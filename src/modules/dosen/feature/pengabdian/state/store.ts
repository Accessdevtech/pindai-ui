import { StatusData } from "@/interface/type"
import { atom } from "jotai"
import { DosenSchemaType } from "../schema/dosen-schema"
import { MahasiswaSchemaType } from "../schema/mahasiswa-schema"

export const dosenAtom = atom<DosenSchemaType[]>([])
export const mahasiswaAtom = atom<MahasiswaSchemaType[]>([])
export const selectedAnggotaAtom = atom<string[]>([])
export const isDialogOpenAtom = atom<boolean>(false)
export const isDialogOpenManualAtom = atom<boolean>(false)
export const statusAtom = atom<StatusData>()
