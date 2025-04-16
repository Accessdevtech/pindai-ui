"use client"
import { CardContent } from "@/components/ui/card"
import { Aktifitas } from "../aktifitas-interface"

export default function Tracker({ data }: { data: Aktifitas }) {
  return (
    <div className='flex flex-col gap-4'>
      <CardContent className='relative space-y-2'>
        {data.steps.map((step, index) => (
          <div key={index} className='relative flex gap-4'>
            {/* Date and Time (Left) */}
            <div className='pr-4 text-right text-sm'>
              <div className='text-gray-700'>
                {step.date}
                <br />
                <span className='font-bold'>{step.time}</span>
              </div>
            </div>
            {/* Timeline dot and line (Middle) */}
            <div className='relative flex-shrink-0'>
              <div className='relative z-10 h-[16px] w-[16px] rounded-full bg-gray-400'></div>
              {/* Timeline line */}
              {index < data.steps.length - 1 && (
                <div className='absolute left-[7px] top-[16px] h-[calc(100%+24px)] w-[2px] bg-gray-200'></div>
              )}
            </div>
            {/* Location and Status (Right) */}
            <div className='flex-1 pl-4'>
              <div className='mb-1 text-lg font-semibold text-gray-900'>
                {step.name}
              </div>
              <div className={`text-sm text-gray-700`}>{step.description}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </div>
  )
}
