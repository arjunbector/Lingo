import { cn } from "@/lib/utils";
import logo from "@/public/fullLogo.svg";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import { GraduationCap, Home, Loader2, ShoppingBag, Swords, TrendingUp } from "lucide-react";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

const Sidebar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]",
        className,
      )}
    >
      <Link href="/learn" className="flex items-center gap-x-2 pb-7 pl-4 pt-8">
        <Image src={logo} height={40} width={40} alt="duolingo" />
        <h1 className="text-xl font-extrabold tracking-wide text-green-600">
          Lingo
        </h1>
      </Link>
      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem label="learn" href="/learn" icon={<Home className="mr-4"/>} />
        <SidebarItem label="leaderboard" href="/leaderboard" icon={<TrendingUp className="mr-4"/>} />
        <SidebarItem label="quests" href="/quests" icon={<Swords className="mr-4"/>} />
        <SidebarItem label="shop" href="/shop" icon={<ShoppingBag className="mr-4"/>} />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground"/>
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/"/>
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default Sidebar;
