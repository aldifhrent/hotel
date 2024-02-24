"use client";

import { useCreateUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { tipeKamarData } from "@/lib/data-hotel";
import { UserSchema } from "@/lib/schema";
import { TipeKamarDataItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignUpForm = () => {
  const [date, setDate] = useState<Date>();

  const [hargaKamar, setHargaKamar] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);

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
  const { mutateAsync: createCustomer } = useCreateUser();

  const handleTotalBayar = () => {
    const tipeKamar = form.getValues("tipeKamar");
    const selected = tipeKamarData.find((item) => {
      return item.value === tipeKamar;
    });

    // Set selected room
    const harga = selected?.harga || 0;

    const duration = form.getValues("durasi") || 0;
    let price = harga * duration;
    if (duration > discDurAtLeastMoreThan) {
      const disc = price * discountRate;
      price = price - disc;
      form.setValue("diskon", disc);
    }

    const isBreakfast = form.getValues("isBreakfast");

    if (isBreakfast) {
      price = price + breakfastPrice;
    }

    form.setValue("totalHarga", price);
  };

  // Updated code by Umar is start from here
  const breakfastPrice = 80000;
  const discountRate = 0.1; // 10 percentage
  const discDurAtLeastMoreThan = 3; // in days

  /**
   * Handle the selection of a room.
   *
   * @param {string} val - The value of the selected room
   * @return {void}
   */
  const handleKamarSelect = (val: string) => {
    const selected = tipeKamarData.find((item) => {
      return item.value === val;
    });

    // Set selected room
    const harga = selected?.harga || 0;

    // set room price
    setHargaKamar(harga);
    form.setValue("harga", harga);

    // Set totalHarga
    const duration = form.getValues("durasi") || 0;
    let price = harga * duration;
    if (duration > discDurAtLeastMoreThan) {
      const disc = price * discountRate;
      price = price - disc;
      form.setValue("diskon", disc);
    }

    setTotalHarga(price);
    form.setValue("totalHarga", price);
    console.log(form.setValue("totalHarga", price));
  };

  /**
   * A function that handles the change in breakfast status.
   *
   * @param {CheckedState} status - the status of the breakfast
   * @return {void}
   */
  const handleBreakfastChange = (status: CheckedState) => {
    if (status) {
      setTotalHarga(totalHarga + breakfastPrice);
      form.setValue("totalHarga", totalHarga + breakfastPrice);
    } else {
      setTotalHarga(totalHarga - breakfastPrice);
      form.setValue("totalHarga", totalHarga - breakfastPrice);
    }
  };

  /**
   * Handles the change in duration input, calculates the price, applies discount if applicable,
   * and updates the total price including breakfast if selected.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - the event object containing the input element
   * @return {void}
   */
  const [duration, setDuration] = useState<number>(0);
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    var target = e.target;
    var targetValue = parseInt(target.value || "0", 10); // Parse value as an integer
    setDuration(targetValue);
    form.setValue("durasi", targetValue);

    let val = parseInt(target.value || "1", 10); // Parse value as an integer
    if (val < 1) {
      val = 1;
    }

    let price = hargaKamar * val;
    if (val > discDurAtLeastMoreThan) {
      const disc = price * discountRate;
      price = price - disc;
      form.setValue("diskon", disc);
    }

    // Check for breakfast
    const isBreakfast = form.getValues("isBreakfast");
    if (isBreakfast) {
      setTotalHarga(price + breakfastPrice);
      form.setValue("totalHarga", price + breakfastPrice);
    } else {
      setTotalHarga(price);
      form.setValue("totalHarga", price);
    }
  };

  async function onSubmit(values: z.infer<typeof UserSchema>) {
    try {
      await createCustomer(values);
      console.log(values);
      toast.success("Sucessfully created");
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
                <Input placeholder="Name" {...field} className="w-full" />
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
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Laki-laki" id="jenis-laki" />
                    <Label htmlFor="jenis-laki">Laki-laki</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Perempuan" id="jenis-perempuan" />
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
                <Input placeholder="Nomor Identitas" {...field} />
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
                  handleKamarSelect(value);
                  field.onChange(value);
                }}
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga</FormLabel>
              <FormControl>
                <Input value={hargaKamar} disabled />
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
                      {date ? format(date, "PPPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
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
                    {...field}
                    onChange={(e) => {
                      handleDurationChange(e);
                    }}
                    value={duration}
                    className="w-full"
                  />
                </FormControl>
                <FormLabel>Hari</FormLabel>
              </div>
              <FormMessage />
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
                      handleBreakfastChange(e);
                    }}
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
            <FormItem className="flex flex-col">
              <FormLabel>Total Harga</FormLabel>
              <FormControl>
                <Input
                  value={totalHarga}
                  disabled
                  className="w-72"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex mx-auto items-center text-center gap-x-8">
          <Button type="button" onClick={handleTotalBayar}>
            Hitung Total Bayar
          </Button>
          <Button type="submit">Register</Button>
          <Button onClick={() => window.location.reload()}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
