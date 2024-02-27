import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ChartPie = () => {
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
    const jenisKelamin = {
      lakilaki: 0,
      perempuan: 0,
    };

    // Lakukan iterasi pada data pelanggan dan hitung jumlah kamar berdasarkan jenisnya
    data.forEach((customer: any) => {
      const roomType = customer.jenisKelamin.toLowerCase(); // Pastikan tipe kamar dalam huruf kecil untuk perbandingan
      if (roomType === "laki-laki") {
        jenisKelamin.lakilaki++;
      } else if (roomType === "perempuan") {
        jenisKelamin.perempuan++;
      }
    });

    return jenisKelamin;
  };

  // Proses data setelah selesai memuat
  if (isLoading) return <div>Loading...</div>;

  // Hitung jumlah kamar berdasarkan jenisnya dari data pelanggan
  const jenisKelaminCount = calculateRoomCounts(customersData);
  // Data untuk grafik yang akan ditampilkan
  const data = [
    { name: "Laki-Laki", total: jenisKelaminCount.lakilaki },
    { name: "Perempuan", total: jenisKelaminCount.perempuan },
  ];

  return (
    <div>
      <h1 className="text-center mb-4 font-bold">
        Data Berdasarkan Jenis Kelamin
      </h1>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="total"
            label={renderCustomizedLabel}
          >
            {data.map((entry: any, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip/>
          <Legend/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPie;
