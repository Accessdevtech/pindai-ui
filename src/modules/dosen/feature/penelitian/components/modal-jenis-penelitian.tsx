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
import { useGetListPenelitian } from "../hook/use-penelitian/get-list-penelitian"
import { columnJenisPenelitian } from "./column-jenis-penelitian"

export default function ModalJenisPenelitian<TFormValue extends FieldValues>({
  ...props
}: {
  control: UseControllerProps<TFormValue>["control"]
  name: FieldPath<TFormValue>
}) {
  const { data: listPenelitian } = useGetListPenelitian()
  const columnsJenisPenelitian = columnJenisPenelitian()
  return (
    <div className='flex grow items-end gap-2'>
      <SelectField
        label='jenis penelitian'
        {...props}
        options={listPenelitian?.data || []}
      />
      <Modal
        title='Detail jenis Penelitian'
        Icon={InfoIcon}
        size='icon'
        description='Berisi informasi tentang jenis penelitian yang akan dilakukan, apakah itu penelitian dasar, terapan atau pengembangan'
        tooltipContent='Detail jenis Penelitian'
        className='max-w-5xl'
      >
        <div className='flex-1 overflow-auto rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <EachUtil
                  of={columnsJenisPenelitian}
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
                of={listPenelitian?.data || []}
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
