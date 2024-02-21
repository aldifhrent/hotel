import CardHotel from "./card-hotel";
import { HotelData } from "@/lib/data-hotel";

const Hotel = () => {
  return (
    <section className="">
      <h1 className="font-bold text-4xl text-center mt-6">Tipe Kamar</h1>
      <div className="flex gap-x-4 w-full mt-2 p-12 items-center justify-center">
        {HotelData.map((hotel) => {
          return (
            <CardHotel key={hotel.name} name={hotel.name} image={hotel.image} />
          );
        })}
      </div>
    </section>
  );
};

export default Hotel;
