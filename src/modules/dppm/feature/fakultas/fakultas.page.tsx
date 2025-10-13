"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState } from "react"

import InputField from "@/components/atom/input-field"
import Modal from "@/components/atom/modal"
import DataTable from "@/components/molecules/data-table"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { useDialog } from "@/hooks/use-dialog"
import { Meta, Role } from "@/interface/type"
import { fakultasSearch } from "@/state/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom } from "jotai"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useDebounce } from "use-debounce"
import { columnFakultas } from "./components/column-fakultas"
import { fakultasSchema, FakultasType } from "./fakultas.schema"
import { useAddFakultas } from "./hooks/use-fakultas/add-fakutlas"
import { useGetFakultas } from "./hooks/use-fakultas/get-fakultas"

export default function FakultasPage({ role }: { role: Role | undefined }) {
  const [value, setValue] = useAtom(fakultasSearch)
  const [search] = useDebounce(value, 500)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const { data, refetch, isFetching } = useGetFakultas(
    currentPage,
    perPage,
    search
  )

  const { isOpen, closeDialog, toggleDialog } = useDialog(data?.fakultas || [])
  const { mutate, isError, error } = useAddFakultas({
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
          form.setError(key as keyof FakultasType, {
            message: value as string,
            type: "manual"
          })
        }
      }
      toast.error(err.response?.data.message)
    }
  })

  const form = useForm<FakultasType>({
    resolver: zodResolver(fakultasSchema),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = async (data: FakultasType) => {
    mutate(data)
  }

  if (isError) toast.error(error?.message)

  const columns = columnFakultas({
    refetch
  })

  return (
    <Card>
      <CardHeader className='px-6 py-8 text-center text-lg font-bold md:text-xl xl:text-2xl'>
        <Modal
          name='tambah fakultas'
          open={isOpen.add}
          setOpen={toggleDialog.add}
          title='tambah fakultas'
          description='tambah fakultas baru'
          btnStyle='capitalize w-fit'
        >
          <Form form={form} onSubmit={onSubmit}>
            <InputField
              label='nama fakultas'
              name='name'
              control={form.control}
            />
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
          data={data?.fakultas || []}
          meta={data?.meta || ({} as Meta)}
          currentPage={currentPage}
          perPage={perPage}
          value={value}
          isLoading={isFetching}
          refetch={refetch}
          setValue={setValue}
          setPerPage={setPerPage}
          onPaginationChange={(page: number) => setCurrentPage(page)}
        />
      </CardContent>
    </Card>
  )
}
