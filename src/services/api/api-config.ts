const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://pindai-be.test/api/v1";

export const API_ENDPOINTS = {
  DOSEN: "/dosen",
  CURRENT_USER: "/me",
  PROFILE: "/profile",
  LOGIN: "/auth/login",
  ANGGOTA: "/list/dosen",
  LOGOUT: "/auth/logout",
  LIST_PRODI: "/list/prodi",
  REGISTER: "/auth/register",
  LIST_FAKULTAS: "/list/fakultas",
  LIST_INDEKSASI: "/list/jenis-indeksasi",
  LIST_PENELITIAN: "/list/jenis-penelitian",
  LIST_PENGABDIAN: "/list/jenis-pengabdian",
};

export const API_ENDPOINTS_DPPM = {
  DASHBOARD: "/dppm/dashboard",
  FAKULTAS: "/dppm/fakultas",
  KAPRODI: "/dppm/kaprodi",
  DOSEN: "/dppm/dosen",
};

export const API_ENDPOINTS_KAPRODI = {
  DOSEN: "/kaprodi/dosen",
  DASHBOARD: "/kaprodi/dashboard",
  ACTIVE: "/kaprodi/active/dosen",
  APPROVED: "/kaprodi/approved/dosen",
};

export const API_ENDPOINTS_DOSEN = {
  DOSEN: "/dosen/dosen",
  AKUN: "/dosen/akun",
  PENELITIAN: "/dosen/penelitian",
};

export { API_BASE_URL };
