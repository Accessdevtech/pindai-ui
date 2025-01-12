import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getInitials(name: string) {
  const names = name?.split(" ")
  if (names?.length > 1) {
    return names[0][0] + names[1][0]
  }
  return names?.[0][0]
}
