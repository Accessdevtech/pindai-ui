"use client"
import { useQuery } from "@tanstack/react-query"
import { getDashboardFakultas } from "../dashboard.service"

export const useFakultas = () =>
  useQuery({
    queryKey: ["fakultas"],
    queryFn: async () => await getDashboardFakultas(),
  })
