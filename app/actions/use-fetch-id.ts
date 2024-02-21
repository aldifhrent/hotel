import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { User } from "@prisma/client";

export const useFetchId = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.get<User>(`/api/customers/${id}`);
      return response.data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
