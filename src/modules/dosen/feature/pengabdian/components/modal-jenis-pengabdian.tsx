import Modal from "@/components/atom/modal"
import SelectField from "@/components/atom/select-field"
import { PengabdianData } from "@/modules/listdata/pengabdian.list.interface"
import { InfoIcon } from "lucide-react"
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import { columnJenisPengabdian } from "./column-jenis-pengabdian"
import DataTableJenisPengabdian from "./data-table-jenis-pengabdian"

export default function ModalJenisPengabdian<TFormValue extends FieldValues>({
  data,
  isFetching,
  ...props
}: {
  data: PengabdianData[]
  isFetching?: boolean
  control: UseControllerProps<TFormValue>["control"]
  name: FieldPath<TFormValue>
}) {
  const columnsJenisPengabdian = columnJenisPengabdian()
  return (
    <div className='flex grow items-end gap-2'>
      <SelectField label='jenis pengabdian' {...props} options={data || []} />
      <Modal
        title='Detail jenis Pengabdian'
        Icon={InfoIcon}
        size='icon'
        description='Berisi informasi tentang jenis pengabdian yang akan dilakukan, apakah itu pengabdian dasar, terapan atau pengembangan'
        tooltipContent='Detail jenis Pengabdian'
        className='max-w-5xl'
      >
        <DataTableJenisPengabdian
          columns={columnsJenisPengabdian}
          data={data || []}
          isLoading={isFetching || false}
        />
      </Modal>
    </div>
  )
}
