export const HotelData = [
  {
    name: "Standard Room",
    image: "/standard.jpeg",
  },
  {
    name: "Deluxe Room",
    image: "/standard.jpeg",
  },
  {
    name: "Luxury Room",
    description: "Test",
    image: "/standard.jpeg",
  },
];
interface TipeKamarDataItem {
  value: string;
  label: string;
  harga: number;
}

export const tipeKamarData: TipeKamarDataItem[] = [
  { value: "standar", label: "Standar", harga: 10000 },
  { value: "deluxe", label: "Deluxe", harga: 100000 },
  { value: "luxury", label: "Luxury", harga: 1000000 },
];
