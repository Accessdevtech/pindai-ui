import InputField from "@/components/atom/input-field"
import Modal from "@/components/atom/modal"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom } from "jotai"
import { EditIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { anggotaSchema, AnggotaSchemaType } from "../schema/dosen-schema"
import { anggotaAtom } from "../state/store"

interface ModalMahasiswaManual {
  data: AnggotaSchemaType
}

export default function EditModalMahasiswaManual({
  data
}: ModalMahasiswaManual) {
  const [anggota, setAnggota] = useAtom(anggotaAtom)
  const [open, setOpen] = useState(false)
  const formMahasiswaManual = useForm<AnggotaSchemaType>({
    resolver: zodResolver(anggotaSchema),
    defaultValues: {
      nidn: "",
      name: "",
      name_with_title: "-",
      fakultas: "",
      prodi: "",
      phone_number: "-",
      email: "-",
      scholar_id: "-",
      scopus_id: "-",
      job_functional: "Mahasiswa",
      affiliate_campus: "-"
    }
  })

  useEffect(() => {
    formMahasiswaManual.reset(data)
  }, [data, formMahasiswaManual])

  const onSubmitMahasiswaManual = (formData: AnggotaSchemaType) => {
    // Check for duplicate data based on NIDN (unique identifier)
    const existingIndex = anggota.findIndex(item => item.nidn === formData.nidn)

    if (existingIndex === -1) {
      // Add new data if no duplicate found
      setAnggota(prevAnggota => [...prevAnggota, formData])
    } else {
      // Replace existing data when duplicate is found
      setAnggota(prevAnggota =>
        prevAnggota.map((item, index) =>
          index === existingIndex ? formData : item
        )
      )
    }
    setOpen(false)
    formMahasiswaManual.reset()
  }
  return (
    <Modal
      title='Daftar mahasiswa penelitian manual'
      open={open}
      setOpen={setOpen}
      Icon={EditIcon}
      size='icon'
      description='Tambahkan mahasiswa penelitian secara manual dengan mengisi form yang tersedia'
      tooltipContent='Detail mahasiswa penelitian'
      variant='outline'
      btnStyle='border-primary text-primary hover:bg-primary hover:text-primary-foreground'
      className='max-w-2xl'
    >
      <Form form={formMahasiswaManual}>
        <InputField
          label='nim'
          name='nidn'
          control={formMahasiswaManual.control}
        />
        <InputField
          label='nama mahasiswa'
          name='name'
          control={formMahasiswaManual.control}
        />
        <InputField
          label='fakultas'
          name='fakultas'
          control={formMahasiswaManual.control}
        />
        <InputField
          label='prodi'
          name='prodi'
          control={formMahasiswaManual.control}
        />
        <Button
          type='button'
          className='capitalize'
          onClick={formMahasiswaManual.handleSubmit(onSubmitMahasiswaManual)}
        >
          simpan
        </Button>
      </Form>
    </Modal>
  )
}
