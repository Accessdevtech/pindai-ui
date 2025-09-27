"use client"
import { DatePickerField } from "@/components/atom/date-picker"
import InputField from "@/components/atom/input-field"
import SelectField from "@/components/atom/select-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatISO } from "date-fns"
import { Loader2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useCreatePublikasi } from "../hooks/use-publikasi/create-publikasi"
import { useGetListPublikasi } from "../hooks/use-publikasi/get-list-publikasi"
import { useUpdatePublikasi } from "../hooks/use-publikasi/update-publikasi"
import { Publikasi } from "../publikasi-interface"
import { publikasiSchema, PublikasiType } from "../schema/publikasi-schema"
import ModalJenisPublikasi from "./modal-jenis-publikasi"

export default function FormPublikasi({
  publikasi,
  refetch,
  onClose
}: {
  publikasi?: Publikasi
  onClose: () => void
  refetch: () => void
}) {
  const { data: listPublikasi } = useGetListPublikasi()
  const form = useForm<PublikasiType>({
    resolver: zodResolver(publikasiSchema),
    defaultValues: {
      judul: publikasi?.judul || "",
      jenis_publikasi: publikasi?.jenis_publikasi || "",
      author: publikasi?.author || "",
      tanggal_publikasi: publikasi?.tanggal_publikasi
        ? new Date(publikasi?.tanggal_publikasi)
        : new Date(),
      tahun: publikasi?.tahun || "",
      jurnal: publikasi?.jurnal || "",
      link_publikasi: publikasi?.link_publikasi || "",
      luaran_kriteria: publikasi?.luaran_kriteria || ""
    }
  })

  const watchJenisPublikasi = form.watch("jenis_publikasi")
  const kriteria = listPublikasi?.data.filter(
    item => item.id === watchJenisPublikasi
  )[0]?.kriteria

  const { mutate: createPublikasi, isPending: createPending } =
    useCreatePublikasi({
      onSuccess(res) {
        toast.success(res.message)
        refetch()
        onClose()
      },
      onError(err) {
        if (err.response?.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            form.setError(key as keyof PublikasiType, {
              message: value as string,
              type: "manual"
            })
          }
        }
      }
    })

  const { mutate: updatePublikasi, isPending: updatePending } =
    useUpdatePublikasi({
      onSuccess(res) {
        toast.success(res.message)
        refetch()
        onClose()
      },
      onError(err) {
        if (err.response?.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            form.setError(key as keyof PublikasiType, {
              message: value as string,
              type: "manual"
            })
          }
        }
      }
    })

  const onSubmit = async (data: PublikasiType) => {
    return publikasi
      ? updatePublikasi({
          id: publikasi.id,
          data: {
            ...data,
            tanggal_publikasi: formatISO(data.tanggal_publikasi)
          }
        })
      : createPublikasi({
          ...data,
          tanggal_publikasi: formatISO(data.tanggal_publikasi)
        })
  }
  return (
    <Form form={form} onSubmit={onSubmit}>
      <InputField label='Judul Publikasi' name='judul' control={form.control} />
      <ModalJenisPublikasi
        data={listPublikasi?.data || []}
        control={form.control}
        name='jenis_publikasi'
      />
      {kriteria && (
        <SelectField
          label='Indeksasi'
          name='luaran_kriteria'
          control={form.control}
          options={kriteria || []}
        />
      )}
      <DatePickerField
        label='Tanggal Publikasi'
        name='tanggal_publikasi'
        control={form.control}
      />
      <InputField label='Tahun' name='tahun' control={form.control} />
      <InputField label='Author' name='author' control={form.control} />
      <InputField label='jurnal' name='jurnal' control={form.control} />
      <InputField
        type='url'
        label='Link Publikasi'
        name='link_publikasi'
        control={form.control}
      />

      <Button type='submit' disabled={createPending || updatePending}>
        Simpan
        {createPending && <Loader2Icon className='ml-2 animate-spin' />}
        {updatePending && <Loader2Icon className='ml-2 animate-spin' />}
      </Button>
    </Form>
  )
}
