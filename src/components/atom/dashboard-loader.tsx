import { Skeleton } from "../ui/skeleton"

export default function DashboardLoader() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <Skeleton className='h-32 w-1/4' />
        <Skeleton className='h-32 w-1/4' />
        <Skeleton className='h-32 w-1/4' />
        <Skeleton className='h-32 w-1/4' />
      </div>
      <Skeleton className='h-32 w-full' />
      <div className='flex gap-4'>
        <Skeleton className='h-32 grow' />
        <Skeleton className='h-32 grow' />
      </div>
      <div className='flex gap-4'>
        <Skeleton className='h-96 grow' />
        <Skeleton className='h-56 grow' />
      </div>
    </div>
  )
}
