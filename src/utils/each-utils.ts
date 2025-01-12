import { Children } from "react"

interface Props<T> {
  of: T[]
  render: (value: T, index: number) => React.ReactNode
}

export function EachUtil<T>({ of, render }: Props<T>) {
  return Children.toArray(of.map((item, index) => render(item, index)))
}
