import { atomWithStorage } from "jotai/utils";
import { AnggotaType } from "../schema/anggota-schema";

export const anggota = atomWithStorage<AnggotaType[]>("anggota", []);
