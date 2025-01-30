"use client"
import { Badge } from "@/components/ui/badge"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react"
import { Aktifitas } from "../aktifitas-interface"

export default function Tracker({ data }: { data: Aktifitas }) {
  return (
    <div className='flex flex-col gap-4'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>{data.title}</span>
          <Badge
            variant='outline'
            className={cn("capitalize", {
              "bg-green-500/30 text-green-500": data.status === "completed",
              "bg-red-500/30 text-red-500": data.status === "canceled",
            })}
          >
            {data.status === "completed"
              ? "Selesai"
              : data.status === "canceled"
                ? "dibatalkan"
                : "Diproses"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className='relative border-l border-gray-200 dark:border-gray-700'>
          {data.steps.map((step, index) => (
            <li key={index} className='mb-10 ml-6'>
              <span className='absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900'>
                {step.completed ? (
                  <CheckCircleIcon className='h-5 w-5 text-green-500' />
                ) : step.canceled ? (
                  <XCircleIcon className='h-5 w-5 text-red-500' />
                ) : (
                  <ClockIcon className='h-5 w-5 text-gray-500' />
                )}
              </span>
              <h3 className='font-medium leading-tight'>{step.name}</h3>
              <p className='text-sm'>{step.date}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </div>
  )
}
