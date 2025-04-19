import { LaporanKemajuan, ViewDocs } from "@/interface/type"
import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Button } from "../ui/button"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`

export default function FileView({
  resDocs,
  scale = 1.24,
}: {
  resDocs: ViewDocs | LaporanKemajuan
  scale?: number
}) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }
  return (
    <>
      <div className='relative overflow-hidden rounded-lg border'>
        <Document
          file={`data:application/pdf;base64,${resDocs.base64}`}
          onLoadSuccess={onDocumentLoadSuccess}
          error={<div className='p-4 text-red-500'>Failed to load PDF</div>}
          loading={<div className='p-4 text-gray-500'>Loading PDF...</div>}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            scale={scale}
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
    </>
  )
}
