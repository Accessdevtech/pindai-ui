"use client"
import InputField from "@/components/atom/input-field"
import Modal from "@/components/atom/modal"
import RadioField from "@/components/atom/radio-field"
import SelectField from "@/components/atom/select-field"
import Tooltip from "@/components/atom/tooltip"
import DataTable from "@/components/molecules/data-table"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useDialog } from "@/hooks/use-dialog"
import { Meta, Role } from "@/interface/type"
import { useGetFakultasList } from "@/modules/listdata/hooks/use-fakultas/get-fakultas-list"
import { useGetProdiList } from "@/modules/listdata/hooks/use-prodi/use-prodi-list"
import { kaprodiSearch } from "@/state/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom } from "jotai"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useDebounce } from "use-debounce"
import { columnKaprodi } from "./components/column-kaprodi"
import { useAddKaprodi } from "./hooks/use-kaprodi/add-kaprodi"
import { useGetKaprodi } from "./hooks/use-kaprodi/get-kaprodi"
import { kaprodiSchema, KaprodiType } from "./kaprodi.schema"

export default function KaprodiPage({ role }: { role: Role | undefined }) {
  const [value, setValue] = useAtom(kaprodiSearch)
  const [show, setShow] = useState(false)
  const [search] = useDebounce(value, 500)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const { data, refetch, isFetching } = useGetKaprodi(
    currentPage,
    perPage,
    search
  )

  const { isOpen, closeDialog, toggleDialog } = useDialog(data?.kaprodi || [])
  const { mutate, isError, error } = useAddKaprodi({
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
          form.setError(key as keyof KaprodiType, {
            message: value as string,
            type: "manual"
          })
        }
      }
      toast.error(err.response?.data.message)
    }
  })

  const form = useForm<KaprodiType>({
    resolver: zodResolver(kaprodiSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      nidn: "",
      address: "",
      fakultas_id: "",
      prodi_id: "",
      status: "true"
    }
  })

  const onSubmit = async (data: KaprodiType) => {
    mutate(data)
  }

  if (isError) toast.error(error?.message)

  const { data: fakultasList } = useGetFakultasList()
  const watchFakultas = form.watch("fakultas_id")
  const { data: prodiList } = useGetProdiList(watchFakultas)

  const columns = columnKaprodi({
    fakultas: fakultasList?.data || [],
    refetch
  })

  const showPassword = () => setShow(!show)

  return (
    <Card>
      <CardHeader className='px-6 py-8 text-center text-lg font-bold md:text-xl xl:text-2xl'>
        <Modal
          name='tambah kaprodi'
          open={isOpen.add}
          setOpen={toggleDialog.add}
          title='tambah kaprodi'
          description='tambah fakultas baru'
          btnStyle='capitalize w-fit'
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
            <div className='relative flex'>
              <InputField
                control={form.control}
                name='password'
                label='password'
                type={!show ? "password" : "text"}
              />
              <Tooltip contentText={!show ? "tampilkan" : "sembunyikan"}>
                <Button
                  variant='ghost'
                  size='icon'
                  type='button'
                  className='absolute right-1 top-8'
                  onClick={showPassword}
                >
                  {!show ? (
                    <EyeOffIcon className='size-4' />
                  ) : (
                    <EyeIcon className='size-4' />
                  )}
                </Button>
              </Tooltip>
            </div>
            <InputField control={form.control} name='nidn' label='nidn' />
            <InputField control={form.control} name='address' label='address' />
            <SelectField
              control={form.control}
              name='fakultas_id'
              label='fakultas'
              options={fakultasList?.data || []}
            />
            <SelectField
              control={form.control}
              name='prodi_id'
              label='prodi'
              options={prodiList?.data || []}
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
      </CardHeader>
      <CardContent>
        <DataTable
          search
          role={role}
          columns={columns}
          data={data?.kaprodi || []}
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
