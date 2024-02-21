-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "no" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "nomorKtp" TEXT NOT NULL,
    "tipeKamar" TEXT NOT NULL,
    "harga" DECIMAL(65,30) NOT NULL,
    "tanggalPesan" TIMESTAMP(3) NOT NULL,
    "durasi" INTEGER NOT NULL,
    "diskon" INTEGER NOT NULL,
    "isBreakfast" BOOLEAN NOT NULL,
    "totalHarga" DECIMAL(65,30) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("no")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
