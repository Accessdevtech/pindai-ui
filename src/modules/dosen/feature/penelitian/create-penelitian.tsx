"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import Divider from "@/components/atom/divider"
import InputField from "@/components/atom/input-field"
import SelectField from "@/components/atom/select-field"
import TextAreaField from "@/components/atom/text-area-field"
import DataTable from "@/components/molecules/data-table"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTE } from "@/services/route"
import { generateAcademicYears } from "@/utils/tahun-akademik"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom } from "jotai"
import { Loader2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { columnAnggotaView } from "./components/column-anggota-view"
import DataKetuaPenelitian from "./components/data-ketua-penelitian"
import ModalAnggota from "./components/modal-anggota"
import ModalAnggotaManual from "./components/modal-anggota-manual"
import ModalJenisPenelitian from "./components/modal-jenis-penelitian"
import { useCreatePenelitian } from "./hook/use-penelitian/create-penelitian"
import { useGetListPenelitian } from "./hook/use-penelitian/get-list-penelitian"
import { penelitianSchema, PenelitianType } from "./schema/penelitian-schema"
import { anggotaAtom } from "./state/store"

export default function CreatePenelitian() {
  const router = useRouter()
  const [tahunAkademik, setTahunAkademik] = useState<string[]>([])

  const [anggota, setAnggota] = useAtom(anggotaAtom)

  const form = useForm<PenelitianType>({
    resolver: zodResolver(penelitianSchema),
    defaultValues: {
      tahun_akademik: "",
      semester: "",
      judul: "",
      bidang: "",
      deskripsi: "",
      jenis_penelitian: "",
      luaran_kriteria: "",
    },
  })

  const { mutate, isPending } = useCreatePenelitian({
    onSuccess: res => {
      if (!res.status) {
        return toast.error(res.message)
      }
      toast.success(res.message)
      setAnggota([])
      form.reset()
      router.push(`${ROUTE.DASHBOARD}/dosen/penelitian/${res.data.id}?new=true`)
    },
    onError: err => {
      if (err.response?.data?.errors) {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          form.setError(key as keyof PenelitianType, {
            message: value as string,
            type: "manual",
          })
        }
      }
    },
  })

  const onSubmit = async (data: PenelitianType) => {
    const datas = {
      ...data,
      anggota,
    }

    mutate(datas)
  }

  const { data: listPenelitian, isFetching } = useGetListPenelitian()

  const watchJenisPenelitian = form.watch("jenis_penelitian")

  const kriteria = listPenelitian?.data.filter(
    item => item.id === watchJenisPenelitian,
  )[0]?.kriteria

  const columnsView = columnAnggotaView()

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const akademikYears = generateAcademicYears(
      currentYear - 5,
      currentYear + 5,
    )
    setTahunAkademik(akademikYears)
  }, [])

  return (
    <div>
      <Breadcrumb href={`${ROUTE.DASHBOARD}/dosen/penelitian`}>
        Buat Penelitian
      </Breadcrumb>
      <Card className='max-w-full'>
        <CardContent className='py-6'>
          <Form form={form} onSubmit={onSubmit}>
            <div className='flex w-full flex-col gap-4'>
              <Divider
                text='data penelitian-tahap 1'
                className='w-[34%] lg:w-[43%]'
              />
              <div className='flex w-full flex-col gap-4 lg:flex-row lg:items-center'>
                <SelectField
                  name='tahun_akademik'
                  label='Tahun Akademik'
                  control={form.control}
                  options={tahunAkademik.map(item => ({
                    id: item.split("/").join(""),
                    name: item,
                  }))}
                />
                <SelectField
                  name='semester'
                  label='Semester'
                  control={form.control}
                  options={[
                    {
                      id: "ganjil",
                      name: "ganjil",
                    },
                    {
                      id: "genap",
                      name: "genap",
                    },
                  ]}
                />
              </div>

              <InputField name='bidang' label='bidang' control={form.control} />
              <InputField name='judul' label='judul' control={form.control} />
              <TextAreaField
                name='deskripsi'
                label='abstrak'
                control={form.control}
              />
              <ModalJenisPenelitian
                data={listPenelitian?.data || []}
                isFetching={isFetching}
                control={form.control}
                name='jenis_penelitian'
              />
              {kriteria && (
                <SelectField
                  label='jenis kriteria'
                  control={form.control}
                  name='luaran_kriteria'
                  options={kriteria || []}
                />
              )}
            </div>

            {/* <div className='mt-4 flex w-full flex-col gap-4 lg:flex-row lg:items-center'>
              <Button
                type='button'
                className='grow capitalize'
                onClick={() => {}}
              >
                unduh template proposal
              </Button>
              <Button
                type='button'
                className='grow capitalize'
                onClick={() => {}}
              >
                unggah proposal
              </Button>
            </div> */}

            <DataKetuaPenelitian />

            <div className='mt-4 flex w-full flex-col gap-4'>
              <Divider
                text='data anggota (tahap pilih anggota) penelitian-tahap 2.2'
                className='w-[17.5%] lg:w-[36%]'
              />
              <div className='flex flex-col gap-2 lg:flex-row'>
                <ModalAnggota />
                <ModalAnggotaManual />
              </div>

              <div>
                <DataTable columns={columnsView} data={anggota} />
              </div>
            </div>

            <Button
              type='submit'
              className='mt-4 w-full capitalize'
              disabled={isPending}
            >
              simpan
              {isPending && <Loader2Icon className='ml-2 animate-spin' />}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
