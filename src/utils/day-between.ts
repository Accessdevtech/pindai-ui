export function daysBetween(a: Date, b: Date) {
  const msPerDay = 24 * 60 * 60 * 1000
  const aMid = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime()
  const bMid = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime()
  return Math.max(0, Math.round((bMid - aMid) / msPerDay))
}
