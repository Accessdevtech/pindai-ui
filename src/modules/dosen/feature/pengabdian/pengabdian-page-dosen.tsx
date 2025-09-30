"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import Modal from "@/components/atom/modal"
import DataTable from "@/components/molecules/data-table"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/services/route"
import {
  periodeActiveAtom,
  statusDppmAtom,
  statusKaprodiAtom,
  statusKeuanganAtom,
  tahunAkademikAtom
} from "@/state/store"
import { useAtomValue } from "jotai"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { Dosen } from "../../dosen.interface"
import { useUserProfile } from "../../hooks/use-profile/get-profile"
import { columnPengabdian } from "./components/column-pengabdian"
import { useGetPengabdian } from "./hook/use-pengabdian/get-pengabdian"

export default function PengabdianDosenPage() {
  const navigate = useRouter()
  const periodeActive = useAtomValue(periodeActiveAtom)
  const tahunAkademik = useAtomValue(tahunAkademikAtom)
  const statusKaprodi = useAtomValue(statusKaprodiAtom)
  const statusDppm = useAtomValue(statusDppmAtom)
  const statusKeuangan = useAtomValue(statusKeuanganAtom)
  const { data: user } = useUserProfile()
  const [value, setValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [search] = useDebounce(value, 1000)
  const [perPage, setPerPage] = useState(10)
  const { data, refetch, isFetching } = useGetPengabdian(
    currentPage,
    perPage,
    search,
    tahunAkademik,
    statusKaprodi,
    statusDppm,
    statusKeuangan
  )

  const columns = columnPengabdian({ refetch })

  if (!user) return null

  const isNull = Object.fromEntries(
    Object.entries(user as Dosen)
      .filter(([key]) => key !== "scholar_id" && key !== "scopus_id")
      .map(([key, value]) => [key, value === null || value === ""])
  )

  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb href={"/dashboard/dosen"}>Pengabdian</Breadcrumb>
      <Card>
        <CardHeader>
          {Object.values(isNull).some(Boolean) ? (
            <Modal
              Icon={PlusIcon}
              name='Tambah Pengabdian'
              title='Profile belum lengkap'
              btnStyle='w-fit'
              tooltipContent='Tambah Pengabdian'
              description='Silahkan lengkapi data diri terlebih dahulu'
            >
              <Link
                href={`${ROUTE.DASHBOARD}/${user?.role}/akun-saya`}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-fit capitalize"
                )}
              >
                <span>update data diri</span>
              </Link>
            </Modal>
          ) : (
            <Button
              onClick={() =>
                navigate.push(
                  `${ROUTE.DASHBOARD}/${user?.role}/pengabdian/create`
                )
              }
              disabled={!periodeActive}
              className={cn("w-fit capitalize")}
            >
              <PlusIcon className='h-4 w-4' />
              <span>tambah pengabdian</span>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <DataTable
            search
            filtering={{
              tahunAkademik: true,
              status: Boolean(statusKaprodi || statusDppm || statusKeuangan),
              reset: true
            }}
            role={user?.role}
            columns={columns}
            data={data?.pengabdian || []}
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
