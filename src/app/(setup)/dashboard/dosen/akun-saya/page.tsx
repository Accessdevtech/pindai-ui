"use client"
import ChangePassword from "@/components/organisms/change-password"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { IProfileDosen } from "@/modules/dosen/dosen.interface"
import ProfileDosen from "@/modules/dosen/dosen.profile"
import { useUserProfile } from "@/modules/dosen/hooks/use-profile/get-profile"

export default function Profile() {
  const { data: user } = useUserProfile()
  if (!user) return null
  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb>
        <BreadcrumbList className='text-base capitalize'>
          <BreadcrumbItem>Seting akun</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>akun</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='grid grid-cols-1 items-start gap-4 xl:grid-cols-2'>
        <ProfileDosen user={user as IProfileDosen} />
        <ChangePassword />
      </div>
    </div>
  )
}
