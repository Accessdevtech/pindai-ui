import InputField from "@/components/atom/input-field"
import Modal from "@/components/atom/modal"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSetAtom } from "jotai"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  mahasiswaSchema,
  MahasiswaSchemaType
} from "../schema/mahasiswa-schema"
import { mahasiswaAtom } from "../state/store"

export default function ModalMahasiswaManual() {
  const setMahasiswa = useSetAtom(mahasiswaAtom)
  const [open, setOpen] = useState(false)
  const formMahasiswaManual = useForm<MahasiswaSchemaType>({
    resolver: zodResolver(mahasiswaSchema),
    defaultValues: {
      nim: "",
      name: "",
      fakultas: "",
      prodi: ""
    }
  })
  const onSubmitMahasiswaManual = (data: MahasiswaSchemaType) => {
    setMahasiswa(prevMahasiswa => [...prevMahasiswa, data])
    setOpen(false)
  }
  return (
    <Modal
      title='Daftar mahasiswa penelitian manual'
      open={open}
      setOpen={setOpen}
      name='tambah mahasiswa manual'
      description='Tambahkan mahasiswa penelitian secara manual dengan mengisi form yang tersedia'
      tooltipContent='Detail mahasiswa penelitian'
      variant='outline'
      btnStyle='border-primary text-primary hover:bg-primary hover:text-primary-foreground'
      className='max-w-2xl'
    >
      <Form form={formMahasiswaManual}>
        <InputField
          label='nim'
          name='nim'
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
