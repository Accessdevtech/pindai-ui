import { atom } from "jotai"
import { StatusPenelitian } from "../penelitian-dosen.interface"
import { AnggotaType } from "../schema/anggota-schema"

export const anggotaAtom = atom<AnggotaType[]>([])
export const selectedAnggotaAtom = atom<string[]>([])
export const isDialogOpenAtom = atom<boolean>(false)
export const isDialogOpenManualAtom = atom<boolean>(false)
export const statusAtom = atom<StatusPenelitian>()
