import Modal from "@/components/atom/modal"
import SelectField from "@/components/atom/select-field"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EachUtil } from "@/utils/each-utils"
import { InfoIcon } from "lucide-react"
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import { useGetListPengabdian } from "../hook/use-pengabdian/get-list-pengabdian"
import { columnJenisPengabdian } from "./column-jenis-pengabdian"

export default function ModalJenisPengabdian<TFormValue extends FieldValues>({
  ...props
}: {
  control: UseControllerProps<TFormValue>["control"]
  name: FieldPath<TFormValue>
}) {
  const { data: listPengabdian } = useGetListPengabdian()
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
        <div className='flex-1 overflow-auto rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <EachUtil
                  of={columnsJenisPengabdian}
                  render={column => (
                    <TableHead key={column.header as string}>
                      {column.header as string}
                    </TableHead>
                  )}
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              <EachUtil
                of={listPengabdian?.data || []}
                render={(item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className='border-r'>{item.name}</TableCell>
                    <TableCell className='flex max-w-xs flex-wrap gap-2 overflow-hidden'>
                      {item.kriteria.map((keterangan, index) => (
                        <Badge key={index} className='text-ellipsis capitalize'>
                          {keterangan}
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell className='border-l'>
                      {item.keterangan}
                    </TableCell>
                  </TableRow>
                )}
              />
            </TableBody>
          </Table>
        </div>
      </Modal>
    </div>
  )
}
