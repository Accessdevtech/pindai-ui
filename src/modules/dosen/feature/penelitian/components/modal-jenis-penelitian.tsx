import Modal from "@/components/atom/modal"
import SelectField from "@/components/atom/select-field"
import { PenelitianData } from "@/modules/listdata/penelitian.list.interface"
import { InfoIcon } from "lucide-react"
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import { columnJenisPenelitian } from "./column-jenis-penelitian"
import DataTableJenisPenelitian from "./data-table-jenis-penelitian"

export default function ModalJenisPenelitian<TFormValue extends FieldValues>({
  data,
  isFetching,
  ...props
}: {
  data: PenelitianData[]
  isFetching?: boolean
  control: UseControllerProps<TFormValue>["control"]
  name: FieldPath<TFormValue>
}) {
  const columnsJenisPenelitian = columnJenisPenelitian()
  return (
    <div className='flex grow items-end gap-2'>
      <SelectField label='jenis penelitian' {...props} options={data} />
      <Modal
        title='Detail jenis Penelitian'
        Icon={InfoIcon}
        size='icon'
        description='Berisi informasi tentang jenis penelitian yang akan dilakukan, apakah itu penelitian dasar, terapan atau pengembangan'
        tooltipContent='Detail jenis Penelitian'
        className='max-w-5xl'
      >
        <DataTableJenisPenelitian
          data={data}
          columns={columnsJenisPenelitian}
          isLoading={isFetching || false}
        />
      </Modal>
    </div>
  )
}
