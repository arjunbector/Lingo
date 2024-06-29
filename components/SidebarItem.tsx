"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { IconNode, LucideProps } from "lucide-react";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { ForwardRefExoticComponent } from "react";

type Props = {
  label: string;
  icon: any;
  href: string;
};
const SidebarItem = ({ label, icon, href }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Button
      variant={isActive ? "sidebarOutline" : "sidebar"}
      className="h-[52px] justify-start"
      asChild
    >
      <Link href={href}>
        {icon}
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
