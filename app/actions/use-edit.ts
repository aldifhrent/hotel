import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { User } from "@prisma/client";

export const useEdit = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: Partial<User> }) => {
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
