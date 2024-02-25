import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Api for get data customer by id
export async function GET(
  req: Request,
  { params }: { params: { customersId: string } }
) {
  try {
    if (!params.customersId) {
      return new NextResponse("CustomerId is required", { status: 400 });
    }
    const customers = await db.user.findFirst({
      where: {
        id: params.customersId,
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error(error);
  }
}

// API for modified customer data by id
export const PATCH = async (
  req: Request,
  { params }: { params: { customersId: string } }
) => {
  if (!params.customersId) {
    return new NextResponse("customerId is required", { status: 400 });
  }
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

  const beasiswa = await db.user.update({
    where: {
      id: params.customersId,
    },
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

  return NextResponse.json(beasiswa);
};

// API for delete customer data by id
export const DELETE = async (
  res: Request,
  { params }: { params: { customersId: string } }
) => {
  try {
    if (!params.customersId) {
      return new NextResponse("BeasiswaId is required", { status: 400 });
    }
    const beasiswa = await db.user.delete({
      where: {
        id: params.customersId,
      },
    });
    return NextResponse.json(beasiswa);
  } catch (error) {
    console.log(error);
  }
};
