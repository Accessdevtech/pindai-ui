import { Separator } from "@/components/ui/separator"

export default function InfoRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <>
      <Separator className='my-4 bg-neutral-400' />
      <div className='flex items-center justify-between'>
        <span className='font-semibold capitalize'>{label}</span>
        <span>{value}</span>
      </div>
    </>
  )
}
