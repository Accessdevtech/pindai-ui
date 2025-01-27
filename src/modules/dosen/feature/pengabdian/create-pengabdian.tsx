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
import DataKetuaPengabdian from "./components/data-ketua-pengabdian"
import ModalAnggota from "./components/modal-anggota"
import ModalAnggotaManual from "./components/modal-anggota-manual"
import ModalJenisPengabdian from "./components/modal-jenis-pengabdian"
import { useCreatePengabdian } from "./hook/use-pengabdian/create-pengabdian"
import { useGetListPengabdian } from "./hook/use-pengabdian/get-list-pengabdian"
import { PengabdianType, pengabdianSchema } from "./schema/pengabdian-schema"
import { anggotaAtom } from "./state/store"

export default function CreatePengabdian() {
  const router = useRouter()
  const [tahunAkademik, setTahunAkademik] = useState<string[]>([])

  const [anggota, setAnggota] = useAtom(anggotaAtom)

  const form = useForm<PengabdianType>({
    resolver: zodResolver(pengabdianSchema),
    defaultValues: {
      tahun_akademik: "",
      semester: "",
      judul: "",
      bidang: "",
      deskripsi: "",
      jenis_pengabdian: "",
      luaran_kriteria: "",
    },
  })

  const { mutate, isPending } = useCreatePengabdian({
    onSuccess: res => {
      if (!res.status) {
        return toast.error(res.message)
      }
      toast.success(res.message)
      setAnggota([])
      form.reset()
      router.push(`${ROUTE.DASHBOARD}/dosen/pengabdian/${res.data.id}`)
    },
    onError: err => {
      if (err.response?.data?.errors) {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          form.setError(key as keyof PengabdianType, {
            message: value as string,
            type: "manual",
          })
        }
      }
    },
  })

  const onSubmit = async (data: PengabdianType) => {
    const datas = {
      ...data,
      anggota,
    }

    mutate(datas)
  }

  const columnsView = columnAnggotaView()

  const { data: listPengabdian, isFetching } = useGetListPengabdian()
  const watchJenisPengabdian = form.watch("jenis_pengabdian")

  const kriteria = listPengabdian?.data.filter(
    item => item.id === watchJenisPengabdian,
  )[0]?.kriteria

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
      <Breadcrumb href={`${ROUTE.DASHBOARD}/dosen/pengabdian`}>
        Buat Pengabdian
      </Breadcrumb>
      <Card className='max-w-full'>
        <CardContent className='py-6'>
          <Form form={form} onSubmit={onSubmit}>
            <div className='flex w-full flex-col gap-4'>
              <Divider
                text='data pengabdian-tahap 1'
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
                label='deskripsi'
                control={form.control}
              />
              <ModalJenisPengabdian
                data={listPengabdian?.data || []}
                isFetching={isFetching}
                control={form.control}
                name='jenis_pengabdian'
              />
              {kriteria && (
                <SelectField
                  name='luaran_kriteria'
                  label='jenis luaran'
                  options={kriteria}
                  control={form.control}
                />
              )}
            </div>

            <DataKetuaPengabdian />

            <div className='mt-4 flex w-full flex-col gap-4'>
              <Divider
                text='data anggota (tahap pilih anggota) pengabdian-tahap 2.2'
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
              simpan{" "}
              {isPending && <Loader2Icon className='ml-2 animate-spin' />}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
