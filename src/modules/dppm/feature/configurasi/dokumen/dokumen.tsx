"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import FieldTemplate from "./components/field-template"
import { useSaveConfigDokumen } from "./hooks/save-config-dokumen"
import { useGetDokumen } from "./hooks/use-get-dokumen"
import { FieldConfig, Payload } from "./type"

export default function DokumentPage() {
  const { data, refetch } = useGetDokumen()
  const [fields, setFields] = useState<FieldConfig[]>([])

  function addField() {
    setFields(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        key: "",
        type: "text",
        value: ""
      }
    ])
  }

  useEffect(() => {
    if (data) {
      setFields(data)
    }
  }, [data])

  function removeField(id: string) {
    setFields(prev => prev.filter(f => f.id !== id))
  }

  function updateField<K extends keyof FieldConfig>(
    id: string,
    key: K,
    value: FieldConfig[K]
  ) {
    setFields(prev => prev.map(f => (f.id === id ? { ...f, [key]: value } : f)))
  }

  const { mutate: saveConfigDokument } = useSaveConfigDokumen({
    onSuccess: res => {
      toast.success(res.message)
      refetch()
    },
    onError: err => {
      toast.error(err.response?.data.message || "Terjadi kesalahan")
    }
  })

  const payload: Payload = useMemo(() => {
    return {
      fields: fields.map(({ key, type, value }) => {
        if (type === "date") {
          // value stored as ISO string from FieldTemplate; parse and validate
          const d = new Date(value as string)
          if (!isNaN(d.getTime())) {
            // format date to local-friendly string for payload if needed,
            // or keep ISO depending on backend contract. Here we keep ISO.
            return { key, type, value: (d as Date).toISOString() }
          }
          return { key, type, value: "" }
        }

        return { key, type, value }
      })
    }
  }, [fields])

  async function savePayload() {
    saveConfigDokument({ data: payload })
  }

  return (
    <Card className='h-full w-full'>
      <CardHeader>
        <CardTitle className='text-pretty'>Document Template Manager</CardTitle>
        <CardDescription>
          Paste your template, detect placeholders, map field types, and preview
          replacements with highlight color.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button type='button' onClick={addField} className='mb-6'>
          Tambah kolom
        </Button>

        {fields.length === 0 ? (
          <p className='text-sm text-muted-foreground'>
            Tidak ada kolom. Klik "Tambah kolom".
          </p>
        ) : (
          <ScrollArea className='max-h-[580px] overflow-y-auto'>
            {fields.map(field => (
              <FieldTemplate
                key={field.id}
                field={field}
                updateField={updateField}
                removeField={removeField}
              />
            ))}
          </ScrollArea>
        )}

        <Button type='button' className='mt-6 w-full' onClick={savePayload}>
          Simpan
        </Button>
      </CardContent>
    </Card>
  )
}
