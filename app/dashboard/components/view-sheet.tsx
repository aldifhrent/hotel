"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { User } from "@prisma/client";
import moment from "moment";

interface editProps {
  id: string;
}
const ViewSheet = ({ id }: editProps) => {
  const [user, setUser] = useState<User[]>([]);
  // Fetch data by id
  async function fetchDataId(id: string) {
    try {
      const response = await axiosInstance.get(`/api/customers/${id}`)
      setUser([response.data])
    } catch (error) {
      toast.error("Error Fetching");
    }
  }
  useEffect(() => {
    fetchDataId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {user.map((users: User) => (
        <div key={users.id} className="flex flex-col">
          <p>Nama : {users.nama}</p>
          <p>Nomor Identitas : {users.nomorKtp.toString()}</p>
          <p>Jenis Kelamin : {users.jenisKelamin}</p>
          <p>Tipe Kamar : {users.tipeKamar}</p>
          <p>Durasi Menginap : {users.durasi} Hari</p>
          <p>Diskon : {users.diskon.toString() !== "0" ? "10%" : "0%"}</p>
          <p>Total Harga : {users.totalHarga.toString()}</p>
        </div>
      ))}
      </div>
    );
};

export default ViewSheet;
