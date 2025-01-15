import Alert from "@/components/atom/alert"
import InputField from "@/components/atom/input-field"
import Modal from "@/components/atom/modal"
import Forms from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { EditIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { IFakultas } from "../../../../listdata/fakultas.interface"
import { fakultasSchema, FakultasType } from "../fakultas.schema"
import { useDeleteFakultas } from "../hooks/use-fakultas/delete-fakultas"
import { useUpdateFakultas } from "../hooks/use-fakultas/update-fakultas"

interface Props {
  refetch: () => void
}

export const columnFakultas = ({ refetch }: Props): ColumnDef<IFakultas>[] => {
  return [
    {
      id: "no",
      header: "No",
      cell: ({ row }) => {
        const index = row.index + 1
        return <span>{index}</span>
      },
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Nama Fakultas",
    },
    {
      id: "action",
      header: "Aksi",
      cell: ({ row }) => {
        const queryClient = useQueryClient()
        const item = row.original
        const [open, setOpen] = useState(false)
        const [alertOpen, setAlertOpen] = useState(false)
        const form = useForm<FakultasType>({
          resolver: zodResolver(fakultasSchema),
          defaultValues: {
            name: item.name,
          },
        })

        const { mutate: updateData } = useUpdateFakultas({
          onSuccess: res => {
            if (!res.status) {
              return toast.error(res.message)
            }
            if (res.data) {
              toast.success(res.message)
            }
            form.reset()
            setOpen(false)
            refetch()
          },
          onError: err => {
            if (err.response?.data.errors) {
              for (const [key, value] of Object.entries(
                err.response.data.errors,
              )) {
                form.setError(key as keyof FakultasType, {
                  message: value as string,
                  type: "manual",
                })
              }
            }
            toast.error(err.response?.data.message)
          },
        })

        const { mutate: deleteData } = useDeleteFakultas({
          onSuccess: res => {
            if (!res.status) {
              return toast.error(res.message)
            }
            if (res.data) {
              toast.success(res.message)
            }
            setAlertOpen(false)
            refetch()
          },
          onError: err => {
            toast.error(err.response?.data.message)
          },
        })

        const onSubmit = async (data: FakultasType) => {
          updateData({ id: item.id, data })
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
              tooltipContent='edit fakultas'
            >
              <Forms form={form} onSubmit={onSubmit}>
                <InputField
                  label='nama fakultas'
                  name='name'
                  control={form.control}
                />
                <Button type='submit' disabled={form.formState.isSubmitting}>
                  simpan
                </Button>
              </Forms>
            </Modal>
            <Alert
              Icon={TrashIcon}
              open={alertOpen}
              setOpen={setAlertOpen}
              title={`hapus data ${item.name} ini`}
              description={`apakah anda yakin ingin menghapus ${item.name} ini?`}
              className='bg-red-500/30 text-red-500 hover:bg-red-500 hover:text-primary-foreground'
              onClick={onDelete}
              tooltipContentText='hapus fakultas'
              size='icon'
              side='right'
            />
          </span>
        )
      },
    },
  ]
}
