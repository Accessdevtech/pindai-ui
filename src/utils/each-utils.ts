import { Children } from "react"

interface EachUtilProps<T> {
  of: T[]
  render: (value: T, index: number) => React.ReactNode
}

export function EachUtil<T>({ of, render }: EachUtilProps<T>) {
  return Children.toArray(of.map((item, index) => render(item, index)))
}

export function Every<T>(of: T[], execute: (value: T) => boolean) {
  return of.every(status => execute(status))
}

export function Reduce<T>(of: T[], execute: (value: T) => boolean) {
  return of.reduce((prev, curr) => prev || execute(curr), false)
}
