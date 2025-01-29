export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const parseRupiah = (rupiahString: string): number => {
  const numericString = rupiahString.replace(/[^\d]/g, "")
  return Number.parseInt(numericString, 10)
}
