"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import Modal from "@/components/atom/modal"
import DataTable from "@/components/molecules/data-table"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useAuthContext } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/services/route"
import { publikasiSearch } from "@/state/store"
import { useAtom, useAtomValue } from "jotai"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { Dosen } from "../../dosen.interface"
import {
  statusDppmAtom,
  statusKaprodiAtom,
  statusKeuanganAtom,
} from "../penelitian/state/store"
import { columnPublikasi } from "./components/column-publikasi"
import FormPublikasi from "./components/form-publikasi"
import { useGetPublikasi } from "./hooks/use-publikasi/get-publikasi"

export default function DosenPublikasi() {
  const statusKaprodi = useAtomValue(statusKaprodiAtom)
  const statusDppm = useAtomValue(statusDppmAtom)
  const statusKeuangan = useAtomValue(statusKeuanganAtom)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useAtom(publikasiSearch)
  const [search] = useDebounce(value, 500)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const { user } = useAuthContext()
  const { data, refetch, isFetching } = useGetPublikasi(
    currentPage,
    perPage,
    search,
    statusKaprodi,
    statusDppm,
    statusKeuangan,
  )
  const isNull = Object.fromEntries(
    Object.entries(user as Dosen).map(([key, value]) => [
      key,
      value === null || value === "",
    ]),
  )

  const columns = columnPublikasi({
    pubilkasi: data?.publikasi || [],
    refetch,
  })
  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb href={"/dashboard/dosen"}>Publikasi</Breadcrumb>
      <Card>
        <CardHeader>
          {Object.values(isNull).some(Boolean) ? (
            <Modal
              Icon={PlusIcon}
              name='Tambah Publikasi'
              title='Profile belum lengkap'
              btnStyle='w-fit'
              tooltipContent='Tambah Publikasi'
              description='Silahkan lengkapi data diri terlebih dahulu'
            >
              <Link
                href={`${ROUTE.DASHBOARD}/${user?.role}/akun-saya`}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-fit capitalize",
                )}
              >
                <span>update data diri</span>
              </Link>
            </Modal>
          ) : (
            <Modal
              open={open}
              setOpen={setOpen}
              Icon={PlusIcon}
              name='Tambah Publikasi'
              title='Tambah Publikasi'
              btnStyle='w-fit'
              description='Silahkan isi formulir publikasi'
              className='max-w-2xl'
            >
              <div className='flex flex-col gap-4 overflow-hidden px-1'>
                <FormPublikasi
                  refetch={refetch}
                  onClose={() => setOpen(false)}
                />
              </div>
            </Modal>
          )}
        </CardHeader>
        <CardContent className='py-6'>
          <DataTable
            search
            filtering={{
              status: Boolean(statusKaprodi || statusDppm || statusKeuangan),
            }}
            role={user?.role}
            columns={columns}
            data={data?.publikasi || []}
            meta={data?.meta}
            value={value}
            perPage={perPage}
            setPerPage={setPerPage}
            refetch={refetch}
            isLoading={isFetching}
            setValue={setValue}
            currentPage={currentPage}
            onPaginationChange={(page: number) => setCurrentPage(page)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
