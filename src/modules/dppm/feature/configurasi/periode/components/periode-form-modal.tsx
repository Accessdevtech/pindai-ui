"use client"
import Modal from "@/components/atom/modal"

import { DatePickerField } from "@/components/atom/date-picker-field"
import InputField from "@/components/atom/input-field"
import SelectField from "@/components/atom/select-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatISO } from "date-fns"
import { EditIcon } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useCreatePeriode } from "../hooks/create-periode"
import { useUpdatePeriode } from "../hooks/update-periode"
import { periodeSchema, PeriodeType } from "../schema"
import { Periode } from "../type"

interface PeriodeFormModalProps {
  mode: "create" | "update"
  isOpen: boolean
  refetch: () => void
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  periode?: Periode
}

export default function PeriodeFormModal({
  mode,
  refetch,
  periode,
  isOpen,
  setIsOpen
}: PeriodeFormModalProps) {
  const form = useForm<PeriodeType>({
    resolver: zodResolver(periodeSchema),
    defaultValues: {
      name: periode?.name || "",
      start_date: periode?.start_date
        ? new Date(periode.start_date)
        : new Date(),
      end_date: periode?.end_date ? new Date(periode.end_date) : new Date(),
      status: periode?.status || "draft"
    }
  })

  const { mutate: createPeriode } = useCreatePeriode({
    onSuccess: response => {
      toast.success(response.message || "Periode berhasil dibuat")
      form.reset()
      setIsOpen(false)
      refetch()
    },
    onError: error => {
      if (error.response?.data.errors) {
        for (const [key, value] of Object.entries(error.response.data.errors)) {
          form.setError(key as keyof PeriodeType, {
            message: value as string,
            type: "manual"
          })
        }
      }
      toast.error(error.response?.data?.message || "Gagal membuat periode")
    }
  })

  const { mutate: updatePeriode } = useUpdatePeriode({
    onSuccess: response => {
      toast.success(response.message || "Periode berhasil diupdate")
      form.reset()
      setIsOpen(false)
      refetch()
    },
    onError: error => {
      if (error.response?.data.errors) {
        for (const [key, value] of Object.entries(error.response.data.errors)) {
          form.setError(key as keyof PeriodeType, {
            message: value as string,
            type: "manual"
          })
        }
      }
      toast.error(error.response?.data?.message || "Gagal diupdate periode")
    }
  })

  const handleSubmit = (data: PeriodeType) => {
    const datas = {
      ...data,
      start_date: formatISO(data.start_date, { representation: "date" }),
      end_date: formatISO(data.end_date, { representation: "date" })
    }
    return periode
      ? updatePeriode({
          id: periode.id,
          data: datas
        })
      : createPeriode(datas)
  }

  return (
    <Modal
      name={mode === "create" ? "tambah periode" : ""}
      title={mode === "create" ? "tambah periode" : "update periode"}
      Icon={mode === "update" ? EditIcon : undefined}
      description={
        mode === "create"
          ? "tambah periode baru"
          : "update periode yang sudah ada"
      }
      disabled={!periode?.can_update}
      tooltipContent={mode === "create" ? "tambah periode" : "update periode"}
      btnStyle={cn("capitalize", {
        "w-fit": mode === "create"
        // "cursor-not-allowed": mode === "update" && !periode?.can_update
      })}
      size={mode === "update" ? "icon" : "default"}
      open={isOpen}
      setOpen={setIsOpen}
    >
      <Form form={form} onSubmit={handleSubmit}>
        <InputField label='nama periode' name='name' control={form.control} />

        <div className='flex w-full items-center justify-center gap-4'>
          <DatePickerField
            label='tanggal mulai'
            disabled={periode?.can_update}
            name='start_date'
            control={form.control}
          />

          <DatePickerField
            label='tanggal selesai'
            name='end_date'
            control={form.control}
          />
        </div>

        {mode === "update" && (
          <SelectField
            label='status'
            name='status'
            control={form.control}
            options={[
              { id: "active", name: "aktif" },
              { id: "close", name: "tutup" },
              { id: "draft", name: "draft" }
            ]}
          />
        )}

        <Button type='submit' disabled={form.formState.isSubmitting}>
          Simpan
        </Button>
      </Form>
    </Modal>
  )
}
