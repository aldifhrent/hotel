import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { User } from "@prisma/client";

// Function to edit data customer by Id
export const useEdit = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await axiosInstance.patch<User>(
        `/api/customers/${id}`,
        body
      );
      return response;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
