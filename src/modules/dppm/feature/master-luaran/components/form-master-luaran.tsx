"use client"
import InputField from "@/components/atom/input-field"
import MoneyField from "@/components/atom/money-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

export default function FormMasterLuaran() {
  const form = useForm({})
  const onSubmit = async (data: any) => {
    console.log(data)
  }

  const formatRp = (value: string) => {
    const angka = value.replace(/[^\d]/g, "")
    const reverse = angka.split("").reverse().join("")
    let ribuan = ""

    for (let i = 0; i < reverse.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        ribuan += "."
      }

      ribuan += reverse[i]
    }

    return "Rp. " + ribuan.split("").reverse().join("")
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <InputField label='Nama Luaran' name='luaran' control={form.control} />

      <MoneyField
        label='Biaya Luaran'
        name='nominal'
        control={form.control}
        form={form}
      />

      <Button type='submit'>Simpan</Button>
    </Form>
  )
}
