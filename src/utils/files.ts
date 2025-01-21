export const downloadDocxFile = (base64String: string, fileName: string) => {
  const link = document.createElement("a")
  link.href = `data:application/msword;base64,${base64String}`
  link.setAttribute("download", `${fileName}`)
  link.style.display = "none"
  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
}

export const uploadDocxFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const fileBase64String = reader.result as string
      resolve(fileBase64String.split(",")[1])
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsDataURL(file)
  })
}

export const uploadPdfFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const fileBase64String = reader.result as string
      resolve(fileBase64String)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsDataURL(file)
  })
}
