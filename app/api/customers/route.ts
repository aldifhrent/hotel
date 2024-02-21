import prismaService from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await prismaService.user.findMany({});

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();

    const {
      nama,
      jenisKelamin,
      nomorKtp,
      tipeKamar,
      harga,
      tanggalPesan,
      durasi,
      diskon,
      isBreakfast,
      totalHarga,
    } = body;

    const user = await prismaService.user.create({
      data: {
        nama,
        jenisKelamin,
        nomorKtp,
        tipeKamar,
        harga,
        tanggalPesan,
        durasi,
        diskon,
        isBreakfast,
        totalHarga,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
};
