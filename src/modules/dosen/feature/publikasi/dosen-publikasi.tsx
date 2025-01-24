"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import Modal from "@/components/atom/modal"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useAuthContext } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/services/route"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { Dosen } from "../../dosen.interface"
import FormPublikasi from "./components/form-publikasi"

export default function DosenPublikasi() {
  const { user } = useAuthContext()
  const isNull = Object.fromEntries(
    Object.entries(user as Dosen).map(([key, value]) => [
      key,
      value === null || value === "",
    ]),
  )
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
              Icon={PlusIcon}
              name='Tambah Publikasi'
              title='Tambah Publikasi'
              btnStyle='w-fit'
              tooltipContent='Tambah Publikasi'
              description='Silahkan isi formulir publikasi'
            >
              <FormPublikasi />
            </Modal>
          )}
        </CardHeader>
        <CardContent className='py-6'>
          {/* <DataTable
            search
            filtering
            role={user?.role}
            columns={columns}
            data={data?.pengabdian || []}
            meta={data?.meta}
            value={value}
            refetch={refetch}
            isLoading={isFetching}
            setValue={setValue}
            currentPage={currentPage}
            onPaginationChange={(page: number) => setCurrentPage(page)}
          /> */}
        </CardContent>
      </Card>
    </div>
  )
}
