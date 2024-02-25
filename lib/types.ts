import { User } from "@prisma/client";

export interface TipeKamarDataItem {
  value: string;
  label: string;
  harga: number;
}

export interface UserProps {
  user: User[];
  handleDelete: (id: string) => void;
}

export interface Users {
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

export interface CardProps {
  data: string;
  title: string;
}

export interface TipeKamarDataItem {
  value: string;
  label: string;
  harga: number;
}