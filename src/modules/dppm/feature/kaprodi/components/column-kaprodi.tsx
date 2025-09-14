/* eslint-disable react-hooks/rules-of-hooks */
import Alert from "@/components/atom/alert"
import InputField from "@/components/atom/input-field"
import Modal from "@/components/atom/modal"
import RadioField from "@/components/atom/radio-field"
import SelectField from "@/components/atom/select-field"
import Tooltip from "@/components/atom/tooltip"
import Form from "@/components/molecules/form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { IFakultas } from "@/modules/listdata/fakultas.interface"
import { useGetProdiList } from "@/modules/listdata/hooks/use-prodi/use-prodi-list"
import { zodResolver } from "@hookform/resolvers/zod"
import { ColumnDef } from "@tanstack/react-table"
import { Check, EditIcon, TrashIcon, X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useDeleteKaprodi } from "../hooks/use-kaprodi/delete-kaprodi"
import { useUpdateKaprodi } from "../hooks/use-kaprodi/update-kaprodi"
import { IKaprodi } from "../kaprodi.interface"
import { kaprodiSchema, KaprodiType } from "../kaprodi.schema"
interface ColumnKaprodiProps {
  fakultas: IFakultas[]
  refetch: () => void
}

export const columnKaprodi = ({
  fakultas,
  refetch
}: ColumnKaprodiProps): ColumnDef<IKaprodi>[] => {
  return [
    {
      id: "no",
      header: "No",
      cell: ({ row, table }) => {
        const page = table.getState().pagination.pageIndex
        const pageSize = table.getState().pagination.pageSize
        const start = page * pageSize + 1
        const end = start + row.index

        return <div>{end}</div>
      }
    },
    {
      id: "nidn",
      accessorKey: "nidn",
      header: "NIDN"
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Nama Kaprodi"
    },
    {
      id: "email",
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email
    },
    {
      id: "fakultas",
      accessorKey: "fakultas",
      header: "Fakultas"
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const item = row.original

        return (
          <Tooltip
            contentText={
              item.status === "true" ? "Kaprodi Aktif" : "Kaprodi Tidak Aktif"
            }
            side='left'
          >
            <Badge
              variant='outline'
              className={cn("p-2 hover:text-primary-foreground", {
                "border-green-500 text-green-500 hover:bg-green-500":
                  item.status === "true",
                "border-red-500 text-red-500 hover:bg-red-500":
                  item.status !== "true"
              })}
            >
              {item.status === "true" ? (
                <Check className='h-4 w-4' />
              ) : (
                <X className='h-4 w-4' />
              )}
            </Badge>
          </Tooltip>
        )
      }
    },
    {
      id: "action",
      header: "Aksi",
      cell: ({ row }) => {
        const item = row.original
        const [open, setOpen] = useState(false)
        const [alertOpen, setAlertOpen] = useState(false)
        const form = useForm<KaprodiType>({
          resolver: zodResolver(kaprodiSchema),
          defaultValues: {
            nidn: item.nidn,
            name: item.name,
            fakultas_id: item.fakultas_id,
            prodi_id: item.prodi_id,
            email: item.email,
            address: item.address,
            status: item.status === "true" ? "true" : "false"
          }
        })

        const watch = form.watch("fakultas_id")
        const { data: prodi } = useGetProdiList(watch)

        const { mutate: updateData } = useUpdateKaprodi({
          onSuccess: () => {
            toast.success("Kaprodi updated")
            refetch()
          },
          onError: err => {
            if (err.response?.data.errors) {
              for (const [key, value] of Object.entries(
                err.response.data.errors
              )) {
                form.setError(key as keyof KaprodiType, {
                  message: value as string,
                  type: "manual"
                })
              }
            }
            toast.error(err.response?.data.message)
          }
        })

        const { mutate: deleteData } = useDeleteKaprodi({
          onSuccess: () => {
            toast.success("Kaprodi deleted")
            refetch()
          },
          onError: err => {
            toast.error(err.response?.data.message)
          }
        })

        const onSubmit = async (data: KaprodiType) => {
          updateData({
            id: item.id,
            data
          })
        }

        const onDelete = async () => {
          deleteData({ id: item.id })
        }

        return (
          <span className='flex justify-center gap-2'>
            <Modal
              Icon={EditIcon}
              size='icon'
              btnStyle='bg-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground'
              title={`edit ${item.name}`}
              description={`edit data ${item.name} ini`}
              open={open}
              setOpen={setOpen}
              side='left'
              tooltipContent='edit kaprodi'
            >
              <Form form={form} onSubmit={onSubmit}>
                <InputField
                  control={form.control}
                  name='name'
                  label='nama kaprodi'
                />
                <InputField
                  control={form.control}
                  name='email'
                  label='email'
                  type='email'
                />
                <InputField control={form.control} name='nidn' label='nidn' />
                <InputField
                  control={form.control}
                  name='address'
                  label='address'
                />
                <SelectField
                  control={form.control}
                  name='fakultas_id'
                  label='fakultas'
                  options={fakultas}
                />
                <SelectField
                  control={form.control}
                  name='prodi_id'
                  label='prodi'
                  options={prodi?.data || []}
                />
                <RadioField
                  control={form.control}
                  name='status'
                  label='status'
                  options={[
                    { label: "aktif", value: "true" },
                    { label: "tidak aktif", value: "false" }
                  ]}
                />
                <Button type='submit' disabled={form.formState.isSubmitting}>
                  simpan
                </Button>
              </Form>
            </Modal>
            <Alert
              Icon={TrashIcon}
              open={alertOpen}
              setOpen={setAlertOpen}
              title={`hapus data ${item.name} ini`}
              description={`apakah anda yakin ingin menghapus ${item.name} ini?`}
              className='bg-red-500/30 text-red-500 hover:bg-red-500 hover:text-primary-foreground'
              onClick={onDelete}
              tooltipContentText='hapus kaprodi'
              triggerAction='Hapus'
              size='icon'
              side='right'
            />
          </span>
        )
      }
    }
  ]
}
