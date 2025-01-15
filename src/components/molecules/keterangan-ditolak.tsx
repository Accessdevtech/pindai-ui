import { PropsWithChildren } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card"

export default function KeteranganDitolak({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  return (
    <Card className='border-red-500'>
      <CardContent className='space-y-2 p-6 capitalize text-red-500'>
        <CardTitle>{title}</CardTitle>
        <CardDescription className='text-red-500'>{children}</CardDescription>
      </CardContent>
    </Card>
  )
}
