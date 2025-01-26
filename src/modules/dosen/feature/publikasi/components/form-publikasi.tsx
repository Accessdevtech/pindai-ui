"use client"
import { DatePickerField } from "@/components/atom/date-picker"
import InputField from "@/components/atom/input-field"
import SelectField from "@/components/atom/select-field"
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
      <TextAreaField
        label='jenis'
        name='jenis_publikasi'
        control={form.control}
      />
      <DatePickerField
        label='Tanggal Publikasi'
        name='date'
        control={form.control}
      />
      <InputField label='Tahun' name='years' control={form.control} />
      <InputField
        // hint='Contoh: anggota 1, anggota 2'
        label='Authors'
        name='authors'
        control={form.control}
      />
      <TextAreaField label='jurnal' name='referensi' control={form.control} />
      <InputField
        type='url'
        label='Link Publikasi'
        name='link_publikasi'
        control={form.control}
      />

      <SelectField
        label='Jenis Indeksasi'
        name='jenis_indeksasi'
        control={form.control}
        options={[]}
      />

      <Button type='submit'>Simpan</Button>
    </Form>
  )
}
