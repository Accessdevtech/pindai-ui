export const formatRupiah = (angka: number) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
  return formatter.format(angka).replace(/^Rp/, "Rp ")
}
