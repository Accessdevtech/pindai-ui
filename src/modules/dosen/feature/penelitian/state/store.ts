import { atom } from "jotai"
import { StatusData } from "../penelitian-dosen.interface"
import { AnggotaType } from "../schema/anggota-schema"

export const anggotaAtom = atom<AnggotaType[]>([])
export const selectedAnggotaAtom = atom<string[]>([])
export const isDialogOpenAtom = atom<boolean>(false)
export const isDialogOpenManualAtom = atom<boolean>(false)
export const statusAtom = atom<StatusData>()
export const tahunAkademikAtom = atom<string>("")
export const statusKaprodiAtom = atom<string>("")
export const statusDppmAtom = atom<string>("")
export const statusKeuanganAtom = atom<string>("")
