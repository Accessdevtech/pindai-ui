"use client"
import InputField from "@/components/atom/input-field"
import Modal from "@/components/atom/modal"
import SelectField from "@/components/atom/select-field"
import DataTable from "@/components/molecules/data-table"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useDialog } from "@/hooks/use-dialog"
import { Meta, Role } from "@/interface/type"
import { useGetFakultasList } from "@/modules/listdata/hooks/use-fakultas/get-fakultas-list"
import { prodiSearch } from "@/state/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom } from "jotai"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useDebounce } from "use-debounce"
import { columnProdi } from "./components/coulmns-prodi"
import { useAddProdi } from "./hooks/use-prodi/add-prodi"
import { useGetProdi } from "./hooks/use-prodi/get-prodi"
import { prodiSchema, ProdiType } from "./prodi.schema"

export default function PageProdi({ role }: { role: Role | undefined }) {
  const [value, setValue] = useAtom(prodiSearch)
  const [search] = useDebounce(value, 500)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const { data: fakultas } = useGetFakultasList()
  const { data, refetch, isFetching } = useGetProdi(
    currentPage,
    perPage,
    search,
  )

  const { isOpen, closeDialog, toggleDialog } = useDialog(data?.prodi || [])

  const { mutate, isError, error } = useAddProdi({
    onSuccess: res => {
      if (!res.status) {
        return toast.error(res.message)
      }
      if (res.data) {
        toast.success(res.message)
      }
      form.reset()
      closeDialog.add()
      refetch()
    },
    onError: err => {
      if (err.response?.data.errors) {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          form.setError(key as keyof ProdiType, {
            message: value as string,
            type: "manual",
          })
        }
      }
      toast.error(err.response?.data.message)
    },
  })

  const form = useForm<ProdiType>({
    resolver: zodResolver(prodiSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (data: ProdiType) => {
    mutate(data)
  }

  if (isError) toast.error(error?.message)

  const columns = columnProdi({
    fakultas: fakultas?.data || [],
    refetch,
  })
  return (
    <Card>
      <CardHeader className='px-6 py-8 text-center text-lg font-bold md:text-xl xl:text-2xl'>
        <Modal
          name='tambah prodi'
          open={isOpen.add}
          setOpen={toggleDialog.add}
          title='tambah prodi'
          description='tambah prodi baru'
          btnStyle='capitalize w-fit'
        >
          <Form form={form} onSubmit={onSubmit}>
            <SelectField
              label='fakultas'
              name='fakultas_id'
              control={form.control}
              options={fakultas?.data || []}
            />
            <InputField label='nama prodi' name='name' control={form.control} />
            <Button type='submit' disabled={form.formState.isSubmitting}>
              simpan
            </Button>
          </Form>
        </Modal>
      </CardHeader>

      <CardContent>
        <DataTable
          search
          role={role}
          columns={columns}
          data={data?.prodi || []}
          meta={data?.meta || ({} as Meta)}
          currentPage={currentPage}
          perPage={perPage}
          value={value}
          isLoading={isFetching}
          refetch={refetch}
          setPerPage={setPerPage}
          setValue={setValue}
          onPaginationChange={(page: number) => setCurrentPage(page)}
        />
      </CardContent>
    </Card>
  )
}
