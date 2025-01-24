"use client"
import { useQuery } from "@tanstack/react-query"
import { getDashboard } from "../dashboard.service"

export const useDashboard = () =>
  useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => await getDashboard(),
  })
