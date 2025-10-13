"use client"
import InputField from "@/components/atom/input-field"
import SelectField from "@/components/atom/select-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { EditableFormTable } from "@/modules/dppm/feature/master-luaran/components/table-input-kriteria"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useCreateLuaran } from "../hooks/use-master-luaran/create-luaran"
import { useUpdateLuaran } from "../hooks/use-master-luaran/update-luaran"
import { Luaran } from "../luaran.interface"
import {
  KriteriaType,
  masterLuaranSchema,
  MasterLuaranType
} from "../schema/luaran"
import { createEditableColumns } from "./column-input-luaran"

export default function FormMasterLuaran({
  onClose,
  luaran,
  refetch
}: {
  onClose: () => void
  luaran?: Luaran
  refetch: () => void
}) {
  const form = useForm<MasterLuaranType>({
    resolver: zodResolver(masterLuaranSchema),
    defaultValues: {
      name: luaran?.name || "",
      category: luaran?.category || "",
      kriteria: luaran?.kriteria || []
    }
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
            type: "manual"
          })
        }
      }
      toast.error(err.response?.data.message)
    }
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
            type: "manual"
          })
        }
      }
      toast.error(err.response?.data.message)
    }
  })
  const onSubmit = async (data: MasterLuaranType) => {
    if (!luaran) {
      return createLuaran(data)
    } else {
      return updateLuaran({ id: luaran.id, data })
    }
  }

  const kriteriaColumns = createEditableColumns<KriteriaType>(
    form,
    "kriteria",
    ["id", "name", "nominal", "keterangan"]
  )

  return (
    <Form form={form} onSubmit={onSubmit}>
      <InputField label='Nama Luaran' name='name' control={form.control} />
      <SelectField
        label='Kategori Luaran'
        name='category'
        control={form.control}
        options={[
          {
            id: "penelitian",
            name: "penelitian"
          },
          {
            id: "pengabdian",
            name: "pengabdian"
          },
          {
            id: "publikasi",
            name: "publikasi"
          }
        ]}
      />

      <EditableFormTable
        form={form}
        name='kriteria'
        columns={kriteriaColumns}
        defaultRow={{ id: "", name: "", nominal: 0, keterangan: "" }}
      />
      {/* <MoneyField
        label='Biaya Luaran'
        name=''
        control={form.control}
        form={form}
      /> */}

      <Button type='submit'>Simpan</Button>
    </Form>
  )
}
