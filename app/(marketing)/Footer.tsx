import { Button } from "@/components/ui/button";
import Image from "next/image";
import Spanish from "@/public/flags/Spanish.svg";
import Crotian from "@/public/flags/Crotian.svg";
import French from "@/public/flags/French.svg";
import Italian from "@/public/flags/Italian.svg";
import Japanese from "@/public/flags/Japanese.svg";

const Footer = () => {
  return (
    <footer className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src={Spanish}
            alt="Spanish"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Spanish
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src={Crotian}
            alt="Crotian"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Crotian
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src={French}
            alt="French"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          French
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src={Italian}
            alt="Italian"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Italian
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src={Japanese}
            alt="Japanese"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Japanese
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
