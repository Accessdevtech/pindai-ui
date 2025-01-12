import axios, { AxiosResponse } from "axios"
import axiosInstance from "./axios-instance"

export const getData = async (url: string, params = {}) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(url, { params })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) throw error
    throw new Error("Failed to fetch data")
  }
}

export const postData = async (url: string, data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(url, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) throw error
    throw new Error("An unexpected error occurred")
  }
}

export const putData = async (url: string, data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.put(url, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) throw error
    throw new Error("Failed to update data")
  }
}

export const delData = async (url: string) => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(url)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) throw error
    throw new Error("Failed to delete data")
  }
}
