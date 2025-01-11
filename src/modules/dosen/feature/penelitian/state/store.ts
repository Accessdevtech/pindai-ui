import { atomWithReset } from "jotai/utils";
import { AnggotaType } from "../schema/anggota-schema";

export const anggota = atomWithReset<AnggotaType[]>([]);
