"use client"
import { useQuery } from "@tanstack/react-query"
import { getDashboard } from "../keuangan.service"

export const useGetDashboard = () =>
  useQuery({
    queryKey: ["dashboard-keuangan"],
    queryFn: async () => await getDashboard(),
  })
