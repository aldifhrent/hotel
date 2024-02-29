import * as z from "zod";
export const UserSchema = z.object({
  nama: z.string().min(1, {
    message: "Nama is required",
  }),
  jenisKelamin: z
    .string({
      required_error: "Jenis Kelamin is required",
    })
    .min(1, {
      message: "Jenis Kelamin is required",
    }),
  nomorKtp: z
    .string({
      required_error: "Jenis Kelamin is required",
    })
    .min(16, {
      message: "Nomor KTP minimum 16",
    }),
  tipeKamar: z
    .string({
      required_error: "Tipe Kamar is required",
    })
    .refine((value) => ["Standar", "Deluxe", "Luxury"].includes(value), {
      message: " Please select from Standar, Deluxe, Luxury.",
    }),
  harga: z.number({
    required_error: "Harga is required",
  }),
  tanggalPesan: z.date().refine((value) => value !== null, {
    message: "Tanggal Pesan is required",
  }),
  durasi: z
    .number({
      required_error: "Durasi is required",
      invalid_type_error: "Durasi must be a number",
    })
    .refine((value) => value >= 0, {
      message: "Durasi must be at least 1",
    }),
  diskon: z.number(),
  isBreakfast: z.boolean(),
  totalHarga: z.number(),
});
