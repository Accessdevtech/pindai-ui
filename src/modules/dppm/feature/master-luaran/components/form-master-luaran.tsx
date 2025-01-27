"use client"
import InputField from "@/components/atom/input-field"
import MoneyField from "@/components/atom/money-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useCreateLuaran } from "../hooks/use-master-luaran/create-luaran"
import { useUpdateLuaran } from "../hooks/use-master-luaran/update-luaran"
import { Luaran } from "../luaran.interface"
import { masterLuaranSchema, MasterLuaranType } from "../schema/luaran"

export default function FormMasterLuaran({
  onClose,
  luaran,
  refetch,
}: {
  onClose: () => void
  luaran?: Luaran
  refetch: () => void
}) {
  const form = useForm<MasterLuaranType>({
    resolver: zodResolver(masterLuaranSchema),
    defaultValues: {
      name: luaran?.name || "",
      nominal: luaran?.nominal || 0,
    },
  })
  const { mutate: createLuaran } = useCreateLuaran({
    onSuccess: res => {
      toast.success(res.message)
      onClose()
      refetch()
      form.reset()
    },
    onError: err => {
      if (err.response?.data.errors) {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          form.setError(key as keyof MasterLuaranType, {
            message: value as string,
            type: "manual",
          })
        }
      }
      toast.error(err.response?.data.message)
    },
  })

  const { mutate: updateLuaran } = useUpdateLuaran({
    onSuccess: res => {
      toast.success(res.message)
      onClose()
      refetch()
    },
    onError: err => {
      if (err.response?.data.errors) {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          form.setError(key as keyof MasterLuaranType, {
            message: value as string,
            type: "manual",
          })
        }
      }
      toast.error(err.response?.data.message)
    },
  })
  const onSubmit = async (data: MasterLuaranType) => {
    if (!luaran) {
      return createLuaran(data)
    } else {
      return updateLuaran({ id: luaran.id, data })
    }
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <InputField label='Nama Luaran' name='name' control={form.control} />

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
