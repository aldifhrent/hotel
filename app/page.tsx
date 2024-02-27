
import About from "@/components/about";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Hotel from "@/components/hotel";
import Location from "@/components/location";
export default function Home() {
  return (
    <main>
      <Header/>
      <Hero/>
      <Hotel/>
      <About/>
      <Location/>
      <Footer/>
    </main>
  );
}
