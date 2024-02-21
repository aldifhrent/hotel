import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex items-center justify-around p-12 h-[500px] bg-slate-100">
      <div className="flex flex-col gap-y-4">
        <h1 className="max-w-lg text-6xl font-bold">
        Tingkatkan Pengalaman Anda dengan Kenyamanan Terbaik
        </h1>
        <Link href={"/register"}>
          <Button className="w-24">Pesan</Button>
        </Link>
      </div>
      <div>
        <Image src="/hero.png" alt="Hero Image" width={440} height={440}/>
      </div>
    </div>
  );
};

export default Hero;
