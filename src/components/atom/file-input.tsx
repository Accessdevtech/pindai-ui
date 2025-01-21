"use client"

import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import React, { useRef, useState } from "react"

interface FileInputProps {
  onFileUpload: (file: File) => void
  accept?: string
  buttonText?: string
  disabled?: boolean
  Icon?: LucideIcon
  size?: "sm" | "default" | "lg" | "icon"
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "secondary"
    | "destructive"
}

export function FileInput({
  onFileUpload,
  accept = ".docx",
  buttonText = "Choose File",
  disabled = false,
  size = "default",
  variant = "default",
  Icon,
}: FileInputProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] || null
    if (file) {
      setFileName(file.name)
      setIsLoading(true)
      try {
        // const base64String = await uploadPdfFile(file)
        onFileUpload(file)
      } catch (error) {
        console.error("Error uploading file:", error)
        // You might want to show an error message to the user here
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className='flex flex-col items-center space-y-2'>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className='hidden'
      />
      <Button
        onClick={handleButtonClick}
        variant={variant}
        size={size}
        disabled={isLoading || disabled}
      >
        {Icon && <Icon />} {buttonText}
      </Button>
    </div>
  )
}
