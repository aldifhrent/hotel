import * as z from "zod";
export const UserSchema = z.object({
  nama: z.string().min(1),
  jenisKelamin: z.string({
    required_error: "Jenis Kelamin is required"
  }),
  nomorKtp: z.string({
    required_error: "Jenis Kelamin is required"
  }).min(16, {
    message: "Nomor KTP minimum 16"
  }),
  tipeKamar: z.string({
    required_error: "Tipe Kamar is required"
  }),
  harga: z.number({
    required_error: "Harga is required"
  }),
  tanggalPesan: z.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a date!",
  }),
  durasi: z.number({
    required_error: "Durasi is required",
    invalid_type_error: "Durasi must be a number",
  }).min(1, {
    message: "Durasi must be at least 1"
  }),
  diskon: z.number(),
  isBreakfast: z.boolean(),
  totalHarga: z.number(),
});
