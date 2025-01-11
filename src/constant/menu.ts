export type SelectedMenu = {
  name: string;
  roles: string[];
  mainMenu?: string[];
};

export const navData = {
  management: [
    {
      name: "fakultas",
      roles: ["dppm"],
    },
    {
      name: "kaprodi",
      roles: ["dppm"],
    },
    {
      name: "dosen",
      roles: ["dppm", "kaprodi"],
    },
  ],
  main: [
    {
      name: "penelitian",
      roles: ["dosen", "kaprodi", "dppm"],
    },
    {
      name: "pengabdian",
      roles: ["dosen", "kaprodi", "dppm"],
    },
    {
      name: "publikasi",
      roles: ["dosen", "kaprodi"],
    },
    {
      name: "scholar",
      roles: ["dosen"],
    },
    {
      name: "scopus",
      roles: ["dosen"],
    },
  ],
  sub: [
    {
      name: "list disetujui",
      roles: ["dppm"],
      mainMenu: ["penelitian", "pengabdian"],
    },
    {
      name: "list dibatalkan",
      roles: ["dppm"],
      mainMenu: ["penelitian", "pengabdian"],
    },
    {
      name: "report management",
      roles: ["dppm"],
      mainMenu: ["fakultas"],
    },
  ],
};
