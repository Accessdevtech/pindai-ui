"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import Modal from "@/components/atom/modal"
import DataTable from "@/components/molecules/data-table"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/services/route"
import { useAtomValue } from "jotai"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { Dosen } from "../../dosen.interface"
import { useUserProfile } from "../../hooks/use-profile/get-profile"
import { columnPenelitian } from "./components/column-penelitian"
import { useGetPenelitian } from "./hook/use-penelitian/get-penelitian"
import {
  statusDppmAtom,
  statusKaprodiAtom,
  statusKeuanganAtom,
  tahunAkademikAtom,
} from "./state/store"

export default function PenelitianDosenPage() {
  const tahunAkademik = useAtomValue(tahunAkademikAtom)
  const statusKaprodi = useAtomValue(statusKaprodiAtom)
  const statusDppm = useAtomValue(statusDppmAtom)
  const statusKeuangan = useAtomValue(statusKeuanganAtom)
  const { data: user } = useUserProfile()
  const [value, setValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [search] = useDebounce(value, 1000)
  const [perPage, setPerPage] = useState(10)
  const { data, refetch, isFetching } = useGetPenelitian(
    currentPage,
    perPage,
    search,
    tahunAkademik,
    statusKaprodi,
    statusDppm,
    statusKeuangan,
  )

  const columns = columnPenelitian({ refetch })

  if (!user) return null

  const isNull = Object.fromEntries(
    Object.entries(user as Dosen)
      .filter(([key]) => key !== "scholar_id" && key !== "scopus_id")
      .map(([key, value]) => [
        key,
        value === null || value === "",
      ]),
  )

  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb href={"/dashboard/dosen"}>Penelitian</Breadcrumb>
      <Card>
        <CardHeader>
          {Object.values(isNull).some(Boolean) ? (
            <Modal
              Icon={PlusIcon}
              name='Tambah Penelitian'
              title='Profile belum lengkap'
              btnStyle='w-fit'
              tooltipContent='Tambah Penelitian'
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
            <Link
              href={`${ROUTE.DASHBOARD}/${user?.role}/penelitian/create`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-fit capitalize",
              )}
            >
              <PlusIcon className='h-4 w-4' />
              <span>tambah penelitian</span>
            </Link>
          )}
        </CardHeader>
        <CardContent className='py-6'>
          <DataTable
            search
            filtering={{
              tahunAkademik: true,
              status: Boolean(statusKaprodi || statusDppm || statusKeuangan),
            }}
            role={user?.role}
            columns={columns}
            data={data?.penelitian || []}
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
