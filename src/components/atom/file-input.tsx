"use client"

import { Button } from "@/components/ui/button"
import { fileAtom } from "@/state/store"
import { useAtom } from "jotai"
import { LucideIcon, X } from "lucide-react"
import React, { useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import Tooltip from "./tooltip"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`
interface FileInputProps {
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
  accept,
  buttonText = "Choose File",
  size = "default",
  variant = "default",
  Icon,
}: FileInputProps) {
  const [file, setFile] = useAtom(fileAtom)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files
    if (files && files[0]) {
      setFile(files[0])
    }
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
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
      <Button onClick={handleButtonClick} variant={variant} size={size}>
        {Icon && <Icon />} {buttonText}
      </Button>

      {file && (
        <div className='relative overflow-hidden rounded-lg border'>
          <Tooltip contentText='Hapus'>
            <Button
              variant='outline'
              size='icon'
              className='absolute right-2 top-2 z-10 rounded-full'
              onClick={() => setFile(null)}
            >
              <X />
            </Button>
          </Tooltip>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            error={<div className='p-4 text-red-500'>Failed to load PDF</div>}
            loading={<div className='p-4 text-gray-500'>Loading PDF...</div>}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={1}
            />
          </Document>

          {numPages && (
            <div className='flex items-center justify-between bg-gray-100 p-4'>
              <Button
                onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
                disabled={pageNumber <= 1}
                variant='outline'
              >
                Previous
              </Button>
              <p className='text-gray-700'>
                Page {pageNumber} of {numPages}
              </p>
              <Button
                onClick={() =>
                  setPageNumber(page => Math.min(page + 1, numPages))
                }
                disabled={pageNumber >= numPages}
                variant='outline'
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
