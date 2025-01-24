"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import Modal from "@/components/atom/modal"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PlusIcon } from "lucide-react"
import FormMasterLuaran from "./components/form-master-luaran"

export default function MasterLuaranPage() {
  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb href={"/dashboard/dppm"}>Master Luaran</Breadcrumb>
      <Card>
        <CardHeader>
          <Modal
            Icon={PlusIcon}
            name='Tambah Master Luaran'
            title='Tambah Master Luaran'
            btnStyle='w-fit'
            description='Tambahkan Master Luaran dan Nominal'
          >
            <FormMasterLuaran />
          </Modal>
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
