import Modal from "@/components/atom/modal"
import SelectField from "@/components/atom/select-field"
import { InfoIcon } from "lucide-react"
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import { useGetListPengabdian } from "../hook/use-pengabdian/get-list-pengabdian"
import { columnJenisPengabdian } from "./column-jenis-pengabdian"
import DataTableJenisPengabdian from "./data-table-jenis-penelitian"

export default function ModalJenisPengabdian<TFormValue extends FieldValues>({
  ...props
}: {
  control: UseControllerProps<TFormValue>["control"]
  name: FieldPath<TFormValue>
}) {
  const { data: listPengabdian, isFetching } = useGetListPengabdian()
  const columnsJenisPengabdian = columnJenisPengabdian()
  return (
    <div className='flex grow items-end gap-2'>
      <SelectField
        label='jenis pengabdian'
        {...props}
        options={listPengabdian?.data || []}
      />
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
          data={listPengabdian?.data || []}
          isLoading={isFetching}
        />
      </Modal>
    </div>
  )
}
