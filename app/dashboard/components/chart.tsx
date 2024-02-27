import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { axiosInstance } from "@/lib/axios";

const Chart = () => {
  // Ambil data dari API menggunakan useQuery
  const {
    data: customersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/api/customers");

        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch customer data");
      }
    },
    refetchInterval: 3000,
  });

  // Fungsi untuk menghitung jumlah kamar berdasarkan jenisnya
  const calculateRoomCounts = (data: any) => {
    const roomCounts = {
      standar: 0,
      deluxe: 0,
      luxury: 0,
    };

    // Lakukan iterasi pada data pelanggan dan hitung jumlah kamar berdasarkan jenisnya
    data.forEach((customer: any) => {
      const roomType = customer.tipeKamar.toLowerCase(); // Pastikan tipe kamar dalam huruf kecil untuk perbandingan
      if (roomType === "standar") {
        roomCounts.standar++;
      } else if (roomType === "deluxe") {
        roomCounts.deluxe++;
      } else if (roomType === "luxury") {
        roomCounts.luxury++;
      }
    });

    return roomCounts;
  };

  // Proses data setelah selesai memuat
  if (isLoading) return <div>Loading...</div>;

  // Hitung jumlah kamar berdasarkan jenisnya dari data pelanggan
  const roomCounts = calculateRoomCounts(customersData);

  // Data untuk grafik yang akan ditampilkan
  const data = [
    { name: "Standar", total: roomCounts.standar },
    { name: "Deluxe", total: roomCounts.deluxe },
    { name: "Luxury", total: roomCounts.luxury },
  ];

  return (
    <div>
      <h1 className="text-center mb-4 font-bold">
        Data Berdasarkan Tipe Kamar
      </h1>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="total" fill="currentColor" />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
