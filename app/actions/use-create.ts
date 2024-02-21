import { axiosInstance } from "@/lib/axios";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { toast } from "sonner";

interface UserProps {
  nama: string;

  jenisKelamin: string;
  nomorKtp: string;
  tipeKamar: string;
  harga: number;
  tanggalPesan: Date;
  durasi: number;
  diskon: number;
  isBreakfast: boolean;
  totalHarga: number;
}
export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (body: UserProps) => {
      const response: AxiosResponse<UserProps> = await axiosInstance.post(
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
