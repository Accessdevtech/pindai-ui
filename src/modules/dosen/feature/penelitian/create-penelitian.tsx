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
import DataKetuaPenelitian from "./components/data-ketua-penelitian"
import ModalDosen from "./components/modal-dosen"
import ModalDosenManual from "./components/modal-dosen-manual"
import ModalJenisPenelitian from "./components/modal-jenis-penelitian"
import ModalMahasiswaManual from "./components/modal-mahasiswa-manual"
import { useCreateDraftPenelitian } from "./hook/use-penelitian/create-draft-penelitian"
import { useCreatePenelitian } from "./hook/use-penelitian/create-penelitian"
import { useGetListPenelitian } from "./hook/use-penelitian/get-list-penelitian"
import { penelitianSchema, PenelitianType } from "./schema/penelitian-schema"
import { anggotaAtom } from "./state/store"

export default function CreatePenelitian() {
  const router = useRouter()
  const [tahunAkademik, setTahunAkademik] = useState<string[]>([])

  const defaultValues = {
    tahun_akademik: "",
    semester: "",
    judul: "",
    bidang: "",
    deskripsi: "",
    jenis_penelitian: "",
    luaran_kriteria: ""
  }
  const [anggota, setAnggota] = useAtom(anggotaAtom)
  const form = useForm<PenelitianType>({
    resolver: zodResolver(penelitianSchema),
    mode: "onSubmit",
    defaultValues
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
            type: "manual"
          })
        }
      }
    }
  })

  const { mutate: mutateDraft, isPending: isPendingDraft } =
    useCreateDraftPenelitian({
      onSuccess: res => {
        if (!res.status) {
          return toast.error(res.message)
        }
        toast.success(res.message)
        setAnggota([])
        form.reset()
        router.push(`${ROUTE.DASHBOARD}/dosen/penelitian`)
      },
      onError: err => {
        if (err.response?.data?.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            form.setError(key as keyof PenelitianType, {
              message: value as string,
              type: "manual"
            })
          }
        }
      }
    })

  const onDraft = async (data: PenelitianType) => {
    // Create complete draft data with anggota
    const draftData = {
      ...data,
      is_draft: true,
      anggota
    }
    mutateDraft(draftData)
  }

  const onSubmit = async (data: PenelitianType) => {
    // Create complete final data with anggota
    const finalData = {
      ...data,
      is_draft: false,
      anggota
    }
    mutate(finalData)
  }

  const { data: listPenelitian, isFetching } = useGetListPenelitian()

  const watchJenisPenelitian = form.watch("jenis_penelitian")

  const kriteria = listPenelitian?.data.find(
    item => item.id === watchJenisPenelitian
  )?.kriteria

  // Note: Validation is handled manually in onDraft and onSubmit functions
  // Draft mode only requires tahun_akademik and semester
  // Final mode requires all fields

  const columnsView = columnAnggotaView()

  const handleReset = () => {
    form.reset()
    setAnggota([])
    form.clearErrors() // Clear any validation errors
  }

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const akademikYears = generateAcademicYears(currentYear, currentYear + 10)
    setTahunAkademik(akademikYears)
  }, [])

  return (
    <div>
      <Breadcrumb href={`${ROUTE.DASHBOARD}/dosen/penelitian`}>
        Create Penelitian
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
                    id: formatAcademicYearForBackend(item),
                    name: item
                  }))}
                />
                <SelectField
                  name='semester'
                  label='Semester'
                  control={form.control}
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

              <InputField name='bidang' label='bidang' control={form.control} />
              <div className='space-y-2'>
                <InputField name='judul' label='judul' control={form.control} />
              </div>
              <div className='space-y-2'>
                <TextAreaField
                  name='deskripsi'
                  label='abstrak'
                  control={form.control}
                />
              </div>
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
                onClick={() => onDraft(form.getValues())}
              >
                Save as Draft
                {isPendingDraft && (
                  <Loader2Icon className='ml-2 animate-spin' />
                )}
              </Button>
              <Button
                type='submit'
                className='mt-4 w-full capitalize'
                disabled={isPending}
              >
                Submit Final
                {isPending && <Loader2Icon className='ml-2 animate-spin' />}
              </Button>
              <Button
                type='reset'
                variant='secondary'
                className='mt-4 w-full border border-muted-foreground capitalize'
                onClick={handleReset}
              >
                Reset Form
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
