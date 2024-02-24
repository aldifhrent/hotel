export const HotelData = [
  {
    name: "Standard Room",
    image: "/standard.jpeg",
    description: "",
    price: 1000000
  },
  {
    name: "Deluxe Room",
    image: "/standard.jpeg",
    description: "",
    price: 1000000
  },
  {
    name: "Luxury Room",
    description: "Test",
    image: "/standard.jpeg",
    price: 1000000
  },
];
interface TipeKamarDataItem {
  value: string;
  label: string;
  harga: number;
}

export const tipeKamarData: TipeKamarDataItem[] = [
  { value: "Standar", label: "Standar", harga: 200000 },
  { value: "Deluxe", label: "Deluxe", harga: 100000 },
  { value: "Luxury", label: "Luxury", harga: 5000000 },
];
