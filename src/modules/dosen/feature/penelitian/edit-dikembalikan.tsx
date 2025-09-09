"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import Divider from "@/components/atom/divider"
import { FileInput } from "@/components/atom/file-input"
import FileView from "@/components/atom/file-view"
import InputField from "@/components/atom/input-field"
import Modal from "@/components/atom/modal"
import SelectField from "@/components/atom/select-field"
import TextAreaField from "@/components/atom/text-area-field"
import DataTable from "@/components/molecules/data-table"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useViewDocs } from "@/hooks/use-view-docs"
import { ViewDocs } from "@/interface/type"
import { cn } from "@/lib/utils"
import { formatAcademicYearForBackend } from "@/schema/validation-utils"
import { ROUTE } from "@/services/route"
import { proposalAtom } from "@/state/store"
import { uploadPdfFile } from "@/utils/files"
import { generateAcademicYears } from "@/utils/tahun-akademik"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom } from "jotai"
import { Loader2Icon, UploadIcon } from "lucide-react"
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
import { useGetDraftPenelitian } from "./hook/use-penelitian/get-draft"
import { useGetListPenelitian } from "./hook/use-penelitian/get-list-penelitian"
import { useUpdatePenelitian } from "./hook/use-penelitian/update-penelitian"
import { useUploadPenelitian } from "./hook/use-penelitian/upload"
import { penelitianSchema, PenelitianType } from "./schema/penelitian-schema"
import { anggotaAtom } from "./state/store"

interface EditDikembalikanPenelitianProps {
  id: string
}

export default function EditDikembalikanPenelitian({
  id
}: EditDikembalikanPenelitianProps) {
  const router = useRouter()
  const [resDocs, setResDocs] = useState<{
    proposal?: ViewDocs
    // laporanKemajuan?: LaporanKemajuan[]
    // suratKeteranganSelesai?: ViewDocs
    // laporan?: ViewDocs
  }>()
  const [tahunAkademik, setTahunAkademik] = useState<string[]>([])
  const { data } = useGetDraftPenelitian(id)
  const [anggota, setAnggota] = useAtom(anggotaAtom)
  const [proposal, setProposal] = useAtom(proposalAtom)
  const [open, setOpen] = useState(false)

  const defaultValues = {
    tahun_akademik: "",
    semester: "",
    judul: "",
    bidang: "",
    deskripsi: "",
    jenis_penelitian: "",
    luaran_kriteria: ""
  }

  const form = useForm<PenelitianType>({
    resolver: zodResolver(penelitianSchema),
    defaultValues
  })

  // Reset form values when data is loaded
  useEffect(() => {
    if (!data) return

    const resetData = {
      tahun_akademik: data.academic_year || "",
      semester: data.semester || "",
      judul: data.title || "",
      bidang: data.bidang || "",
      deskripsi: data.deskripsi || "",
      jenis_penelitian: data.jenis_penelitian || "",
      luaran_kriteria: data.jenis_kriteria || ""
    }
    form.reset(resetData)
  }, [data, form])

  const { mutateAsync: upload } = useUploadPenelitian({
    onSuccess(res) {
      toast.success(res.message)
      setProposal(null)
    },
    onError(err) {
      toast.error(err.response?.data.message)
    }
  })

  const handleFileUpload = async () => {
    const fileEncode = await uploadPdfFile(proposal as File)

    return await upload({
      id,
      file: fileEncode,
      category: "penelitian",
      jenis_dokumen: "proposal"
    })
  }

  const { mutate, isPending } = useUpdatePenelitian({
    onSuccess: res => {
      if (!res.status) {
        return toast.error(res.message)
      }
      toast.success(res.message)
      setAnggota([])
      setProposal(null)
      // Upload document proposal

      router.push(`${ROUTE.DASHBOARD}/dosen/penelitian/${res.data.id}`)
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
      toast.error(err.response?.data.message)
    }
  })

  const { mutate: mutateDraft, isPending: isPendingDraft } =
    useUpdatePenelitian({
      onSuccess: res => {
        if (!res.status) {
          return toast.error(res.message)
        }
        toast.success(res.message)
        setAnggota([])
        setProposal(null)

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

  const { data: listPenelitian, isFetching } = useGetListPenelitian()

  const watchJenisPenelitian = form.watch("jenis_penelitian")

  const kriteria = listPenelitian?.data.find(
    item => item.id === watchJenisPenelitian
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

  // Set anggota data when draft penelitian data is loaded
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

  const onDraft = async (data: PenelitianType) => {
    try {
      // First, upload file if proposal exists
      if (proposal) {
        await handleFileUpload()
      }

      // Then proceed with data update
      const datas = {
        ...data,
        is_draft: true,
        anggota
      }

      mutateDraft({ id, data: datas })
    } catch (error) {
      toast.error("Failed to upload file. Please try again.")
    }
  }

  const onSubmit = async (data: PenelitianType) => {
    try {
      // First, upload file if proposal exists
      if (proposal) {
        await handleFileUpload()
      }

      // Then proceed with data update
      const datas = {
        ...data,
        is_draft: false,
        anggota
      }
      mutate({ id, data: datas })
    } catch (error) {
      toast.error("Failed to upload file. Please try again.")
    }
  }

  const { mutateAsync: viewDocs, isPending: isPendingViewDocs } = useViewDocs()
  const isFileExist = data?.existFile === true

  const viewFile = async (jenis_dokument: string) => {
    const response = await viewDocs({
      id,
      category: "penelitian",
      jenis_dokumen: jenis_dokument.split(" ").join("_")
    })
    return response
  }

  useEffect(() => {
    Promise.allSettled([viewFile("proposal")]).then(res => {
      const [proposal] = res
      setResDocs({
        proposal: proposal.status === "fulfilled" ? proposal.value : undefined
      })
    })
  }, [])

  return (
    <div>
      <Breadcrumb href={`${ROUTE.DASHBOARD}/dosen/penelitian`}>
        Edit Penelitian
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

            <div className='flex w-full flex-col gap-2'>
              <Modal
                title={`${resDocs?.proposal ? resDocs?.proposal.file_name.split("-").join(" ").replace(".pdf", "") : "Sedang Mendapatkan File Proposal"}`}
                name='Lihat Proposal'
                btnStyle='w-full'
                tooltipContent='Lihat Proposal'
              >
                <div className='max-h-[calc(100vh-200px)] w-fit flex-1 overflow-auto'>
                  {isPendingViewDocs ? (
                    <Loader2Icon className='animate-spin' />
                  ) : resDocs?.proposal ? (
                    <FileView
                      resDocs={resDocs?.proposal as ViewDocs}
                      scale={1}
                    />
                  ) : (
                    <div className='capitalize'>
                      File tidak tersedia / belum di unggah
                    </div>
                  )}
                </div>
              </Modal>
              <Modal
                open={open}
                setOpen={setOpen}
                name='Unggah Proposal Penelitian'
                Icon={UploadIcon}
                title='Unggah Proposal Penelitian'
                // disabled={!isLeader || isDisabled}
                btnStyle='w-full'
                description='Unggah penelitian Anda dalam format PDF menggunakan form ini.'
                className={cn({
                  "max-h-fit max-w-2xl": proposal
                })}
              >
                <div className='max-h-[calc(100vh-200px)] flex-1 overflow-auto'>
                  <FileInput
                    file={proposal as File}
                    setFile={setProposal}
                    accept='.pdf'
                    variant='outline'
                    size='sm'
                  />
                </div>
              </Modal>
              <p
                className={cn(
                  "text-sm font-semibold text-muted-foreground",
                  isFileExist && "text-green-500"
                )}
              >
                {isFileExist
                  ? `Anda telah mengunggah proposal penelitian: ${data.title}`
                  : "Anda belum mengunggah proposal penelitian"}
              </p>
            </div>

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
