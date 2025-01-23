import Divider from "@/components/atom/divider"
import { FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dosen } from "@/modules/dosen/dosen.interface"
import { useUserProfile } from "@/modules/dosen/hooks/use-profile/get-profile"
import { Label } from "@radix-ui/react-label"

export default function DataKetuaPengabdian() {
  const { data: user } = useUserProfile()
  if (!user) return null
  return (
    <div className='mt-4 flex w-full flex-col gap-4'>
      <Divider
        text='data ketua pengabdian-tahap 2.1'
        className='w-[30%] lg:w-[41.5%]'
      />
      <div className='flex w-full flex-col gap-4 lg:flex-row lg:items-center'>
        <FormItem className='flex-grow'>
          <Label className='text-xs uppercase tracking-wider'>NIDN</Label>
          <Input
            defaultValue={user?.nidn === null ? "0000" : user?.nidn}
            disabled
          />
        </FormItem>
        <FormItem className='flex-grow'>
          <Label className='text-xs uppercase tracking-wider'>NO. HP</Label>
          <Input defaultValue={(user as Dosen)?.phone_number} disabled />
        </FormItem>
        <FormItem className='flex-grow'>
          <Label className='text-xs uppercase tracking-wider'>Prodi</Label>
          <Input defaultValue={(user as Dosen)?.prodi} disabled />
        </FormItem>
      </div>
      <div className='flex w-full flex-col gap-4 lg:flex-row lg:items-center'>
        <FormItem className='flex-grow'>
          <Label className='text-xs uppercase tracking-wider'>
            Nama Lengkap (Tanpa Gelar)
          </Label>
          <Input defaultValue={user?.name} disabled />
        </FormItem>
        <FormItem className='flex-grow'>
          <Label className='text-xs uppercase tracking-wider'>
            Nama Lengkap (Menggunakan Gelar)
          </Label>
          <Input defaultValue={(user as Dosen)?.name_with_title} disabled />
        </FormItem>
      </div>
      <div className='flex w-full flex-col gap-4 lg:flex-row lg:items-center'>
        <FormItem className='flex-grow'>
          <Label className='text-xs uppercase tracking-wider'>Email</Label>
          <Input defaultValue={user?.email} disabled />
        </FormItem>
        <FormItem className='flex-grow'>
          <Label className='text-xs uppercase tracking-wider'>Scholar ID</Label>
          <Input defaultValue={(user as Dosen)?.scholar_id} disabled />
        </FormItem>
        <FormItem className='flex-grow'>
          <Label className='text-xs uppercase tracking-wider'>Scopus ID</Label>
          <Input defaultValue={(user as Dosen)?.scopus_id} disabled />
        </FormItem>
        <FormItem className='flex-grow'>
          <Label className='text-xs uppercase tracking-wider'>
            Jabatan funsional
          </Label>
          <Input defaultValue={(user as Dosen)?.job_functional} disabled />
        </FormItem>
      </div>
      <FormItem className='flex-grow'>
        <Label className='text-xs uppercase tracking-wider'>
          Affiliasi kampus
        </Label>
        <Input defaultValue={(user as Dosen)?.affiliate_campus} disabled />
      </FormItem>
    </div>
  )
}
