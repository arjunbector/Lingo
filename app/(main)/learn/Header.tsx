import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="sticky top-0 mb-5 flex pt-6 items-center justify-between border-b-2 bg-white pb-3 text-neutral-400 lg:z-50 ">
      <Link href="/courses">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
        </Button>
      </Link>
      <h1 className="text-lg font-bold">{title}</h1>
      <div />
    </div>
  );
};

export default Header;
