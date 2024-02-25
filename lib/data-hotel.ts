import { TipeKamarDataItem } from "./types";

export const HotelData = [
  {
    name: "Standard Room",
    image: "/standard.jpeg",
    description:
      "Kamar standar merupakan pilihan yang nyaman dan terjangkau bagi para tamu yang mencari akomodasi sederhana namun nyaman. Biasanya dilengkapi dengan fasilitas dasar seperti tempat tidur ukuran standar, kamar mandi pribadi, dan area tempat duduk. Ruangan ini cocok untuk wisatawan yang menginginkan tempat istirahat sederhana selama perjalanan mereka.",
    price: 200000,
  },
  {
    name: "Deluxe Room",
    image: "/deluxe.jpg",
    description: "Kamar deluxe menawarkan kenyamanan ekstra dan ruang yang lebih luas daripada kamar standar. Mereka sering kali menampilkan desain yang lebih mewah dan fasilitas tambahan untuk meningkatkan pengalaman menginap. Kamar ini cocok untuk tamu yang mencari pengalaman menginap yang lebih istimewa dan nyaman.",
    price: 100000,
  },
  {
    name: "Luxury Room",
    description: "Kamar luxury adalah pilihan yang paling eksklusif dan mewah dalam kategori akomodasi hotel. Mereka menawarkan pengalaman menginap yang paling istimewa dengan desain interior yang elegan dan fasilitas yang sangat lengkap. Kamar ini cocok untuk tamu yang menginginkan kemewahan dan kenyamanan paling tinggi selama menginap mereka.",
    image: "/luxury.jpeg",
    price: 5000000,
  },
];

export const tipeKamarData: TipeKamarDataItem[] = [
  { value: "Standar", label: "Standar", harga: 200000 },
  { value: "Deluxe", label: "Deluxe", harga: 100000 },
  { value: "Luxury", label: "Luxury", harga: 5000000 },
];
