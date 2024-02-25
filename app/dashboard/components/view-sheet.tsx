"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserSchema } from "@/lib/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEdit } from "@/app/actions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { tipeKamarData } from "@/lib/data-hotel";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";

interface editProps {
  id: string;
}
const ViewSheet = ({ id }: editProps) => {
  const { mutate: editData } = useEdit();
  const router = useRouter();
  // Fetch data by id
  async function fetchDataId(id: string) {
    try {
      const response = await axiosInstance.get(`/api/customers/${id}`);
      if (response) {
        form.setValue("nama", response.data.nama);
        form.setValue("jenisKelamin", response.data.jenisKelamin);
        form.setValue("nomorKtp", response.data.nomorKtp);
        form.setValue("tipeKamar", response.data.tipeKamar);
        form.setValue("harga", parseInt(response.data.harga));
        form.setValue("tanggalPesan", new Date(response.data.tanggalPesan));
        form.setValue("durasi", response.data.durasi);
        form.setValue("isBreakfast", response.data.isBreakfast);
        form.setValue("totalHarga", parseInt(response.data.totalHarga));
      }
      setHargaKamar(parseInt(response.data.harga));
      setDate(new Date(response.data.tanggalPesan));
      setDuration(response.data.durasi);
      setTotalHarga(parseInt(response.data.totalHarga));
      setJenisKelamin(response.data.jenisKelamin);
    } catch (error) {
      toast.error("Error Fetching");
    }
  }
  useEffect(() => {
    fetchDataId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const [date, setDate] = useState<Date>();
  const [hargaKamar, setHargaKamar] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);
  const [jenisKelamin, setJenisKelamin] = useState("");
  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      nama: "",
      jenisKelamin: "",
      nomorKtp: "",
      tipeKamar: "",
      harga: 0,
      tanggalPesan: new Date(),
      durasi: 1,
      diskon: 0,
      isBreakfast: false,
      totalHarga: 0,
    },
  });
  // Total Bayar

  const breakfastPrice = 80000;
  const discountRate = 0.1; // 10 percentage
  const discDurAtLeastMoreThan = 3; // in days

  // Handle the selection of a room.

  // A function that handles the change in breakfast status.


  //Handles the change in duration input, calculates the price, applies discount if applicable,
  //and updates the total price including breakfast if selected

  const [duration, setDuration] = useState<number>(0);
 
  async function onSubmit(values: z.infer<typeof UserSchema>) {
    try {
      await editData({ id: id, body: values });
      toast.success("Sucessfully edit");
      router.back();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Name Pemesan</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} className="w-full" disabled/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jenisKelamin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Kelamin</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={jenisKelamin}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Laki-laki" id="jenis-laki" disabled/>
                    <Label htmlFor="jenis-laki">Laki-laki</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Perempuan" id="jenis-perempuan" disabled/>
                    <Label htmlFor="jenis-perempuan">Perempuan</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nomorKtp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Identitas</FormLabel>
              <FormControl>
                <Input placeholder="Nomor Identitas" {...field} disabled/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tipeKamar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe Kamar</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
                disabled
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Tipe Kamar" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {tipeKamarData.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="harga"
          render={() => (
            <FormItem>
              <FormLabel>Harga</FormLabel>
              <FormControl>
                <Input type="number" value={hargaKamar.toString()} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tanggalPesan"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>Tanggal Pesan</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => {
                        setDate(date);
                        // Update the form value for tanggalPesan
                        form.setValue("tanggalPesan", date as Date);
                      }}
                      initialFocus
                      disabled
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="durasi"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-x-2">
                <FormLabel>Durasi</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={duration}
                    className="w-full"
                    disabled
                  />
                </FormControl>
                <FormLabel>Hari</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isBreakfast"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-x-4">
                <FormLabel>Termasuk Breakfast</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(e) => {
                      field.onChange(e);
                    }}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalHarga"
          render={() => (
            <FormItem className="flex items-center">
              <FormLabel>Total Harga</FormLabel>
              <FormControl>
                <Input value={totalHarga} disabled className="w-72" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex mx-auto items-center text-center gap-x-8">
          <Button type="button" onClick={() => router.back()}>Cancel</Button>
        </div>

      </form>

    </Form>
  );
};

export default ViewSheet;
