import InputField from "@/components/atom/input-field"
import Modal from "@/components/atom/modal"
import SelectField from "@/components/atom/select-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { jabatanFungsional } from "@/constant/jabatan-fungsional"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom, useSetAtom } from "jotai"
import { useForm } from "react-hook-form"
import { anggotaSchema, AnggotaType } from "../schema/anggota-schema"
import { anggotaAtom, isDialogOpenManualAtom } from "../state/store"

export default function ModalAnggotaManual() {
  const setAnggota = useSetAtom(anggotaAtom)
  const [openModalManual, setOpenModalManual] = useAtom(isDialogOpenManualAtom)
  const formAnggotaManual = useForm<AnggotaType>({
    resolver: zodResolver(anggotaSchema),
    defaultValues: {
      nidn: "",
      name: "",
      name_with_title: "",
      prodi: "",
      phone_number: "",
      email: "",
      scholar_id: "",
      scopus_id: "",
      job_functional: "",
      affiliate_campus: "",
    },
  })
  const onSubmitAnggotaManual = (data: AnggotaType) => {
    setAnggota(prevAnggota => [...prevAnggota, data])
    setOpenModalManual(false)
  }
  return (
    <Modal
      title='Daftar anggota pengabdian manual'
      open={openModalManual}
      setOpen={setOpenModalManual}
      name='tambah anggota manual'
      description='Tambahkan anggota pengabdian secara manual dengan mengisi form yang tersedia'
      tooltipContent='Detail anggota pengabdian'
      variant='outline'
      btnStyle='border-primary text-primary hover:bg-primary hover:text-primary-foreground'
      className='max-w-2xl'
    >
      <Form form={formAnggotaManual}>
        <div className='flex flex-wrap gap-4'>
          <InputField
            label='nidn'
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
          <SelectField
            control={formAnggotaManual.control}
            name='job_functional'
            label='Jabatan fungsional'
            options={jabatanFungsional}
          />
          {/* <InputField
            label='Jabatan funsional'
            name='job_functional'
            control={formAnggotaManual.control}
          /> */}
          <InputField
            label='Affiliasi kampus'
            name='affiliate_campus'
            control={formAnggotaManual.control}
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
