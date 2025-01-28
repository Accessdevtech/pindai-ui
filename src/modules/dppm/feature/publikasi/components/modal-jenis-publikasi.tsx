import Modal from "@/components/atom/modal"
import SelectField from "@/components/atom/select-field"
import { InfoIcon } from "lucide-react"
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import { PublikasiList } from "../publikasi-interface"
import { columnJenisPublikasi } from "./column-jenis-publikasi"
import DataTableJenisPublikasi from "./data-table-jenis-publikasi"

export default function ModalJenisPublikasi<TFormValue extends FieldValues>({
  data,
  isFetching,
  ...props
}: {
  data: PublikasiList[]
  isFetching?: boolean
  control: UseControllerProps<TFormValue>["control"]
  name: FieldPath<TFormValue>
}) {
  const columnsJenisPublikasi = columnJenisPublikasi()
  return (
    <div className='flex grow items-end gap-2'>
      <SelectField label='jenis publikasi' {...props} options={data || []} />
      <Modal
        title='Detail jenis Publikasi'
        Icon={InfoIcon}
        size='icon'
        description='Berisi informasi tentang jenis publikasi yang akan dilakukan, apakah itu publikasi dasar, terapan atau pengembangan'
        tooltipContent='Detail jenis Publikasi'
        className='max-w-5xl'
      >
        <DataTableJenisPublikasi
          columns={columnsJenisPublikasi}
          data={data || []}
          isLoading={isFetching || false}
        />
      </Modal>
    </div>
  )
}
