"use client"
import { useQuery } from "@tanstack/react-query"
import { getDashboard } from "../dashboard.service"

export const useGetDashboard = () =>
  useQuery({
    queryKey: ["dashboard-dppm"],
    queryFn: async () => await getDashboard(),
  })
