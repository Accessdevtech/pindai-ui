export type SelectedMenu = {
  name: string
  roles: string[]
  mainMenu?: string[]
}

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
    {
      name: "master luaran",
      roles: ["dppm"],
    },
  ],
  main: [
    {
      name: "penelitian",
      roles: ["dosen", "kaprodi", "dppm", "keuangan"],
    },
    {
      name: "pengabdian",
      roles: ["dosen", "kaprodi", "dppm", "keuangan"],
    },
    {
      name: "publikasi",
      roles: ["dosen", "kaprodi", "dppm", "keuangan"],
    },
    {
      name: "scholar",
      roles: ["dosen"],
    },
    {
      name: "list disetujui",
      roles: ["dppm", "kaprodi", "keuangan"],
    },
    {
      name: "list dibatalkan",
      roles: ["dppm", "kaprodi", "keuangan"],
    },
  ],
  sub: [
    {
      name: "progress",
      roles: ["dosen"],
      mainMenu: ["penelitian", "pengabdian", "publikasi"],
    },
    // {
    //   name: "list dibatalkan",
    //   roles: ["dppm"],
    //   mainMenu: ["penelitian", "pengabdian"],
    // },
    // {
    //   name: "report management",
    //   roles: ["dppm"],
    //   mainMenu: ["fakultas"],
    // },
  ],
}
