import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import moment from "moment";
import { UserProps } from "@/lib/types";
import Link from "next/link";

const TableDashboard = ({ user, handleDelete }: UserProps) => {
  return (
    <Table className="mt-12">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">No</TableHead>
          <TableHead className="text-center">Nomor KTP</TableHead>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Jenis Kelamin</TableHead>
          <TableHead className="text-center">Tipe Kamar</TableHead>
          <TableHead className="text-center">Harga</TableHead>
          <TableHead className="text-center">Tanggal Pesan</TableHead>
          <TableHead className="text-center">Durasi</TableHead>
          <TableHead className="text-center">Diskon</TableHead>
          <TableHead className="text-center">Breakfast</TableHead>
          <TableHead className="text-center">Total Harga</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {user?.map((value: User, index: number) => (
          <TableRow
            key={index}
            className="items-center text-center justify-center"
          >
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{value.nomorKtp}</TableCell>
            <TableCell className="font-medium">{value.nama}</TableCell>
            <TableCell className="font-medium">{value.jenisKelamin}</TableCell>
            <TableCell className="font-medium">{value.tipeKamar}</TableCell>
            <TableCell className="font-medium">
              {value.harga.toString()}
            </TableCell>
            <TableCell className="font-medium">
              {moment(value.tanggalPesan).format("D MMMM  YYYY")}
            </TableCell>
            <TableCell className="font-medium">{value.durasi}</TableCell>
            <TableCell className="font-medium">
              {value.diskon.toString()}
            </TableCell>
            <TableCell className="font-medium w-fit">
              {value.isBreakfast ? 80000 : "No Include"}
            </TableCell>
            <TableCell className="font-medium w-fit">
              {value.totalHarga.toString()}
            </TableCell>
            <TableCell className="flex gap-x-2">
              <Link href={`/dashboard/${value.id}`}>
                <Button>Edit</Button>
              </Link>
              <Button
                onClick={() => handleDelete(value.id)}
                variant="destructive"
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableDashboard;
