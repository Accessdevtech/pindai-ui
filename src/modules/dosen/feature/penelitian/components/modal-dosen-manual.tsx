import InputField from "@/components/atom/input-field"
import Modal from "@/components/atom/modal"
import SelectField from "@/components/atom/select-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { jabatanFungsional } from "@/constant/jabatan-fungsional"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom, useSetAtom } from "jotai"
import { useForm } from "react-hook-form"
import { AnggotaSchemaType, anggotaSchema } from "../schema/dosen-schema"
import { anggotaAtom, isDialogOpenManualAtom } from "../state/store"

export default function ModalDosenManual() {
  const setAnggota = useSetAtom(anggotaAtom)
  const [openModalManual, setOpenModalManual] = useAtom(isDialogOpenManualAtom)
  const formAnggotaManual = useForm<AnggotaSchemaType>({
    resolver: zodResolver(anggotaSchema),
    defaultValues: {
      nidn: "",
      name: "",
      name_with_title: "",
      fakultas: "",
      prodi: "",
      phone_number: "",
      email: "",
      scholar_id: "",
      scopus_id: "",
      job_functional: "",
      affiliate_campus: ""
    }
  })
  const onSubmitAnggotaManual = (data: AnggotaSchemaType) => {
    setAnggota(prevAnggota => [...prevAnggota, data])
    setOpenModalManual(false)
  }
  return (
    <Modal
      title='Daftar dosen penelitian manual'
      open={openModalManual}
      setOpen={setOpenModalManual}
      name='tambah dosen manual'
      description='Tambahkan dosen penelitian secara manual dengan mengisi form yang tersedia'
      tooltipContent='Detail dosen penelitian'
      variant='outline'
      btnStyle='border-primary text-primary hover:bg-primary hover:text-primary-foreground'
      className='max-w-2xl'
    >
      <Form form={formAnggotaManual}>
        <div className='grid grid-cols-2 place-content-center content-center gap-4'>
          <InputField
            label='NIDN'
            name='nidn'
            control={formAnggotaManual.control}
          />
          <InputField
            label='nama'
            name='name'
            control={formAnggotaManual.control}
          />

          <InputField
            label='nama dengan gelar'
            name='name_with_title'
            control={formAnggotaManual.control}
          />
          <InputField
            label='fakultas'
            name='fakultas'
            control={formAnggotaManual.control}
          />
          <InputField
            label='prodi'
            name='prodi'
            control={formAnggotaManual.control}
          />
          <InputField
            label='No. Hp'
            name='phone_number'
            control={formAnggotaManual.control}
          />
          <InputField
            label='email'
            type='email'
            name='email'
            control={formAnggotaManual.control}
          />
          <InputField
            label='Scholar ID'
            name='scholar_id'
            control={formAnggotaManual.control}
          />
          <InputField
            label='Scopus ID'
            name='scopus_id'
            control={formAnggotaManual.control}
          />
          <InputField
            label='Affiliasi kampus'
            name='affiliate_campus'
            control={formAnggotaManual.control}
          />
          <SelectField
            control={formAnggotaManual.control}
            name='job_functional'
            label='Jabatan fungsional'
            options={jabatanFungsional}
          />
        </div>
        <Button
          type='button'
          className='capitalize'
          onClick={formAnggotaManual.handleSubmit(onSubmitAnggotaManual)}
        >
          simpan
        </Button>
      </Form>
    </Modal>
  )
}
