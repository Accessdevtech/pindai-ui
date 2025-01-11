export interface Fakultas {
  name: string;
  dosen_count: number;
}

export const penelitian = [
  {
    message: "penelitian disetujui",
    status: "disetujui",
    totalDosen: 10,
  },
  {
    message: "penelitian ditolak",
    status: "ditolak",
    totalDosen: 10,
  },
];

export const pengabdian = [
  {
    message: "pengabdian disetujui",
    status: "disetujui",
    totalDosen: 10,
  },
  {
    message: "pengabdian ditolak",
    status: "ditolak",
    totalDosen: 10,
  },
];

export const researchData = [
  {
    id: 1,
    title: "Penelitian A",
    lead: "Bayu Priyambada",
    field: "Bidang 1",
    year: "2024",
    createdAt: "14 Des 2024",
    status: {
      kaprodi: true,
      dppm: true,
    },
  },
];

export const infoData = [
  { label: "NIDN", value: "001" },
  { label: "Email", value: "mail.prodi@pindai.com" },
  { label: "No. hp", value: "08123456789" },
  { label: "Jabatan Fungsional", value: "null" },
  { label: "SK Jabatan Fungsional", value: "null" },
  { label: "Prodi", value: "Fakultas Teknik" },
  { label: "Schopus ID", value: "10213123213" },
  { label: "Scholar ID", value: "10213123213" },
];
