"use client"
import InputField from "@/components/atom/input-field"
import TextAreaField from "@/components/atom/text-area-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

export default function FormPublikasi() {
  const form = useForm({})
  const onSubmit = async (data: any) => {
    console.log(data)
  }
  return (
    <Form form={form} onSubmit={onSubmit}>
      <InputField label='Judul Publikasi' name='title' control={form.control} />
      <TextAreaField label='Abstract' name='abstract' control={form.control} />
      <InputField
        type='url'
        label='Link Publikasi'
        name='link_publikasi'
        control={form.control}
      />
      <InputField
        hint='Contoh: anggota 1, anggota 2'
        label='Anggota'
        name='anggota'
        control={form.control}
      />
      <TextAreaField
        label='Referensi'
        name='referensi'
        control={form.control}
      />

      <Button type='submit'>Simpan</Button>
    </Form>
  )
}
