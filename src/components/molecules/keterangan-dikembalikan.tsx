import { PropsWithChildren } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card"

export default function KeteranganDikembalikan({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  return (
    <Card className='border-yellow-500'>
      <CardContent className='space-y-2 p-6 capitalize text-yellow-500'>
        <CardTitle>{title}</CardTitle>
        <CardDescription className='text-yellow-500'>
          {children}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
