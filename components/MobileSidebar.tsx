import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="text-white h-6 w-6 shrink-0" />
        </SheetTrigger>
        <SheetContent className="p-0 z-[100]" side="left">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
