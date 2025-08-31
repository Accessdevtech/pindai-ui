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
import { formatAcademicYearForBackend } from "@/schema/validation-utils"
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
import ModalDosen from "./components/modal-dosen"
import ModalDosenManual from "./components/modal-dosen-manual"
import ModalJenisPengabdian from "./components/modal-jenis-pengabdian"
import ModalMahasiswaManual from "./components/modal-mahasiswa-manual"
import { useGetDraftPengabdian } from "./hook/use-pengabdian/get-draft"
import { useGetListPengabdian } from "./hook/use-pengabdian/get-list-pengabdian"
import { useUpdatePengabdian } from "./hook/use-pengabdian/update-pengabdian"
import { pengabdianSchema, PengabdianType } from "./schema/pengabdian-schema"
import { anggotaAtom } from "./state/store"

interface EditPengabdianProps {
  id: string
}

export default function EditPengabdian({ id }: EditPengabdianProps) {
  const router = useRouter()
  const [tahunAkademik, setTahunAkademik] = useState<string[]>([])
  const { data } = useGetDraftPengabdian(id)
  const [anggota, setAnggota] = useAtom(anggotaAtom)

  const defaultValues = {
    tahun_akademik: "",
    semester: "",
    judul: "",
    bidang: "",
    deskripsi: "",
    jenis_pengabdian: "",
    luaran_kriteria: ""
  }

  const formSubmit = useForm<PengabdianType>({
    resolver: zodResolver(pengabdianSchema),
    defaultValues
  })

  // Reset form values when data is loaded
  useEffect(() => {
    if (data) {
      formSubmit.reset({
        tahun_akademik: data.academic_year || "",
        semester: data.semester || "",
        judul: data.title || "",
        bidang: data.bidang || "",
        deskripsi: data.deskripsi || "",
        jenis_pengabdian: data.jenis_pengabdian || "",
        luaran_kriteria: data.jenis_kriteria || ""
      })
    }
  }, [data, formSubmit])

  const { mutate, isPending } = useUpdatePengabdian({
    onSuccess: res => {
      if (!res.status) {
        return toast.error(res.message)
      }
      toast.success(res.message)
      setAnggota([])
      formSubmit.reset()
      router.push(`${ROUTE.DASHBOARD}/dosen/pengabdian/${res.data.id}`)
    },
    onError: err => {
      if (err.response?.data?.errors) {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          formSubmit.setError(key as keyof PengabdianType, {
            message: value as string,
            type: "manual"
          })
        }
      }
    }
  })

  const { mutate: mutateDraft, isPending: isPendingDraft } =
    useUpdatePengabdian({
      onSuccess: res => {
        if (!res.status) {
          return toast.error(res.message)
        }
        toast.success(res.message)
        setAnggota([])
        formSubmit.reset()
        router.push(`${ROUTE.DASHBOARD}/dosen/pengabdian`)
      },
      onError: err => {
        if (err.response?.data?.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            formSubmit.setError(key as keyof PengabdianType, {
              message: value as string,
              type: "manual"
            })
          }
        }
      }
    })

  const { data: listPengabdian, isFetching } = useGetListPengabdian()

  const watchJenisPengabdian = formSubmit.watch("jenis_pengabdian")

  const kriteria = listPengabdian?.data.find(
    item => item.id === watchJenisPengabdian
  )?.kriteria

  const columnsView = columnAnggotaView()

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const akademikYears = generateAcademicYears(
      currentYear - 5,
      currentYear + 5
    )
    setTahunAkademik(akademikYears)
  }, [])

  // Set anggota data when draft pengabdian data is loaded
  useEffect(() => {
    if (data?.anggota) {
      // Filter out the leader (is_leader = 1) and map to DosenSchemaType format
      const anggotaData = data.anggota
        .filter(member => member.is_leader !== 1)
        .map(member => ({
          nidn: member.nidn || "",
          name: member.name,
          name_with_title: member.name_with_title || "",
          fakultas: member.fakultas,
          prodi: member.prodi,
          phone_number: member.phone_number,
          email: member.email,
          scholar_id: member.scholar_id,
          scopus_id: member.scopus_id,
          job_functional: member.job_functional,
          affiliate_campus: member.affiliate_campus
        }))
      setAnggota(anggotaData)
    }
  }, [data?.anggota, setAnggota])

  const onDraft = async (data: PengabdianType) => {
    const datas = {
      ...data,
      is_draft: true,
      anggota
    }
    mutateDraft({ id, data: datas })
  }

  const onSubmit = async (data: PengabdianType) => {
    const datas = {
      ...data,
      is_draft: false,
      anggota
    }

    mutate({ id, data: datas })
  }

  return (
    <div>
      <Breadcrumb href={`${ROUTE.DASHBOARD}/dosen/pengabdian`}>
        Edit Pengabdian
      </Breadcrumb>
      <Card className='max-w-full'>
        <CardContent className='py-6'>
          <Form form={formSubmit} onSubmit={onSubmit}>
            <div className='flex w-full flex-col gap-4'>
              <Divider
                text='data pengabdian-tahap 1'
                className='w-[34%] lg:w-[43%]'
              />
              <div className='flex w-full flex-col gap-4 lg:flex-row lg:items-center'>
                <SelectField
                  name='tahun_akademik'
                  label='Tahun Akademik'
                  control={formSubmit.control}
                  options={tahunAkademik.map(item => ({
                    id: formatAcademicYearForBackend(item),
                    name: item
                  }))}
                />
                <SelectField
                  name='semester'
                  label='Semester'
                  control={formSubmit.control}
                  options={[
                    {
                      id: "ganjil",
                      name: "ganjil"
                    },
                    {
                      id: "genap",
                      name: "genap"
                    }
                  ]}
                />
              </div>

              <InputField
                name='bidang'
                label='bidang'
                control={formSubmit.control}
              />
              <InputField
                name='judul'
                label='judul'
                control={formSubmit.control}
              />
              <TextAreaField
                name='deskripsi'
                label='abstrak'
                control={formSubmit.control}
              />
              <ModalJenisPengabdian
                data={listPengabdian?.data || []}
                isFetching={isFetching}
                control={formSubmit.control}
                name='jenis_pengabdian'
              />
              {kriteria && (
                <SelectField
                  label='jenis kriteria'
                  control={formSubmit.control}
                  name='luaran_kriteria'
                  options={kriteria || []}
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
                <ModalDosen />
                <ModalDosenManual />
                <ModalMahasiswaManual />
              </div>

              <div>
                <DataTable columns={columnsView} data={anggota} />
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <Button
                type='button'
                variant='outline'
                className='mt-4 w-full border border-primary capitalize text-primary hover:bg-primary hover:text-primary-foreground'
                disabled={isPendingDraft}
                onClick={() => onDraft(formSubmit.getValues())}
              >
                Draft as form
                {isPendingDraft && (
                  <Loader2Icon className='ml-2 animate-spin' />
                )}
              </Button>
              <Button
                type='submit'
                className='mt-4 w-full capitalize'
                disabled={isPending}
              >
                Submit & upload proposal
                {isPending && <Loader2Icon className='ml-2 animate-spin' />}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
