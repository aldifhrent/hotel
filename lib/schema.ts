import * as z from "zod";
export const UserSchema = z.object({
  nama: z.string(),
  jenisKelamin: z.string(),
  nomorKtp: z.string(),
  tipeKamar: z.string(),
  harga: z.number(),
  tanggalPesan: z.date(),
  durasi: z.number(),
  diskon: z.number(),
  isBreakfast: z.boolean(),
  totalHarga: z.string(),
});
