/* eslint-disable react-hooks/rules-of-hooks */
import Alert from "@/components/atom/alert"
import InputField from "@/components/atom/input-field"
import Modal from "@/components/atom/modal"
import SelectField from "@/components/atom/select-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { IFakultas } from "@/modules/listdata/fakultas.interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { ColumnDef } from "@tanstack/react-table"
import { EditIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useDeleteProdi } from "../hooks/use-prodi/delete-prodi"
import { useUpdateProdi } from "../hooks/use-prodi/update-prodi"
import { IProdi } from "../prodi.interface"
import { prodiSchema, ProdiType } from "../prodi.schema"

interface ColumnProdiProps {
  fakultas: IFakultas[]
  refetch: () => void
}

export const columnProdi = ({
  fakultas,
  refetch
}: ColumnProdiProps): ColumnDef<IProdi>[] => {
  return [
    {
      id: "no",
      header: "No",
      cell: ({ row }) => {
        const index = row.index + 1
        return <span>{index}</span>
      }
    },
    {
      id: "fakultas",
      accessorKey: "fakultas",
      header: "Fakultas",
      cell: ({ row }) => row.original.fakultas.name
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Prodi"
    },
    {
      id: "action",
      header: "Aksi",
      cell: ({ row }) => {
        const item = row.original
        const [open, setOpen] = useState(false)
        const [alertOpen, setAlertOpen] = useState(false)
        const form = useForm<ProdiType>({
          resolver: zodResolver(prodiSchema),
          defaultValues: {
            name: item.name,
            fakultas_id: item.fakultas.id
          }
        })

        const { mutate: updateData } = useUpdateProdi({
          onSuccess: () => {
            toast.success("Prodi berhasil di update")
            refetch()
          },
          onError: err => {
            if (err.response?.data.errors) {
              for (const [key, value] of Object.entries(
                err.response.data.errors
              )) {
                form.setError(key as keyof ProdiType, {
                  message: value as string,
                  type: "manual"
                })
              }
            }
            toast.error(err.response?.data.message)
          }
        })

        const { mutate: deleteData } = useDeleteProdi({
          onSuccess: () => {
            toast.success("Kaprodi deleted")
            refetch()
          },
          onError: err => {
            toast.error(err.response?.data.message)
          }
        })

        const onSubmit = async (data: ProdiType) => {
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
                <SelectField
                  control={form.control}
                  name='fakultas_id'
                  label='fakultas'
                  options={fakultas}
                />
                <InputField
                  control={form.control}
                  name='name'
                  label='nama prodi'
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
              tooltipContentText='hapus'
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
