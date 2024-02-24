import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

interface CardHotelProps {
  name: string;
  image: string;
  description: string;
  price: number;
}
const CardHotel = ({ name, image, description, price }: CardHotelProps) => {
  return (
    <Card className="w-[400px] h-[350px] items-center justify-center mx-auto">
      <CardHeader>
        <CardTitle className="text-center">{name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Image src={image} alt="Standar Room" width={350} height={350} />
        <CardDescription>{description}</CardDescription>
        <p>{price}</p>
      </CardContent>
    </Card>
  );
};

export default CardHotel;
