export const generateAcademicYears = (startYear: number, endYear: number) => {
  const years = []
  for (let year = startYear; year <= endYear; year++) {
    years.push(`${year}/${year + 1}`)
  }
  return years
}
