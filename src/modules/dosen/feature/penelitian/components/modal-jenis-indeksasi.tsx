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
import { useGetListIndeksasi } from "../hook/use-indeksasi/get-list-indeksasi"
import { columnJenisIndeksasi } from "./column-jenis-indeksasi"

export default function ModalJenisIndeksasi<TFormValue extends FieldValues>({
  ...props
}: {
  control: UseControllerProps<TFormValue>["control"]
  name: FieldPath<TFormValue>
}) {
  const { data: listIndeksasi } = useGetListIndeksasi()
  const columnsJenisIndeksasi = columnJenisIndeksasi()
  return (
    <div className='flex grow items-end gap-2'>
      <SelectField
        {...props}
        label='jenis indeksasi'
        options={listIndeksasi?.data || []}
      />
      <Modal
        title='Detail jenis indeksasi'
        Icon={InfoIcon}
        size='icon'
        description='Berisi informasi tentang jenis indeksasi yang akan digunakan, apakah itu Sinta, Scopus, WoS, Dimensions, atau DOAJ'
        tooltipContent='Detail jenis indeksasi'
        className='max-w-5xl'
      >
        <Table>
          <TableHeader>
            <TableRow>
              <EachUtil
                of={columnsJenisIndeksasi}
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
              of={listIndeksasi?.data || []}
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
                  <TableCell className='border-l'>{item.keterangan}</TableCell>
                </TableRow>
              )}
            />
          </TableBody>
        </Table>
      </Modal>
    </div>
  )
}
