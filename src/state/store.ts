import { Kriteria } from "@/modules/listdata/pengabdian.list.interface"
import { VisibilityState } from "@tanstack/react-table"
import { atom } from "jotai"

export const dosenSearch = atom("")
export const fakultasSearch = atom("")
export const prodiSearch = atom("")
export const kaprodiSearch = atom("")
export const publikasiSearch = atom("")

export const kriteriaAtom = atom<Kriteria>()

export const fileAtom = atom<File | null>(null)
export const coverAtom = atom<File | null>(null)
export const suratPengajuanAtom = atom<File | null>(null)
export const suratRekomendasiAtom = atom<File | null>(null)
export const proposalAtom = atom<File | null>(null)
export const kontrakPenelitianAtom = atom<File | null>(null)
export const kontrakPengabdianAtom = atom<File | null>(null)
export const suratKeteranganSelesaiAtom = atom<File | null>(null)
export const laporanKemajuanAtom = atom<File | null>(null)
export const laporanAtom = atom<File | null>(null)

export const columnVisibilityAtom = atom<VisibilityState>({})
