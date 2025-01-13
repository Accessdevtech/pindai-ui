import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as ShadcnBreadcrumb,
} from "@/components/ui/breadcrumb"
import { EachUtil } from "@/utils/each-utils"
import Link from "next/link"
import { PropsWithChildren } from "react"

interface Props {
  href: string
  data?: { name: string; href?: string }[]
}

export default function Breadcrumb({
  href,
  children,
  data,
}: PropsWithChildren<Props>) {
  return (
    <ShadcnBreadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={href}>Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {data && (
          <EachUtil
            of={data}
            render={(item, index) => (
              <span key={index} className='flex items-center gap-2 capitalize'>
                <BreadcrumbItem>
                  {!item.href ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href || ""}>{item.name}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </span>
            )}
          />
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className='capitalize'>{children}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  )
}
