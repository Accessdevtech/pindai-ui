import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { PropsWithChildren } from "react"

interface Props {
  title: string
  description?: string
  footer?: React.ReactNode
}

export default function AuthCard({
  title,
  footer,
  children,
  description,
}: PropsWithChildren<Props>) {
  return (
    <Card className='w-full max-w-xs'>
      <CardHeader className='flex items-center justify-center text-center'>
        <p className='text-2xl font-bold uppercase tracking-wider'>{title}</p>
        {description && (
          <p className='text-sm uppercase tracking-widest text-muted-foreground'>
            {description}
          </p>
        )}
      </CardHeader>
      <CardContent className='flex justify-center'>{children}</CardContent>
      {footer && (
        <CardFooter className='flex justify-center'>{footer}</CardFooter>
      )}
    </Card>
  )
}
