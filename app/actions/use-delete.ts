import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { User } from "@prisma/client";

// Function for delete data customer
export const useDelete = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete<User>(`/api/customers/${id}`);
      return response.data;
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
