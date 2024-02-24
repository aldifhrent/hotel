'use client'

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

// Function for fetching data from API
export const useTotalUser = () => {
  return useQuery({
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/api/customers");
        return response.data.length

      } catch (error) {
        console.log(error)
      }
    },
    queryKey: ['fetch'],
    refetchInterval: 3000,
  });
};
