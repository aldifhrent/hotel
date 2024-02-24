import { axiosInstance } from "@/lib/axios";
import { Users } from "@/lib/types";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { toast } from "sonner";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (body: Users) => {
      const response: AxiosResponse<Users> = await axiosInstance.post(
        `/api/customers`,
        body
      );
      return response.data;
    },
    onError: (error) => {
      console.error("Error creating customer:", error);
      toast.error(error.message);
    },
  });
};
