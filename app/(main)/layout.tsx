import MobileHeader from "@/components/MobileHeader";
import Sidebar from "@/components/Sidebar";

const LearnLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="h-full pt-[50px] lg:pl-[256px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto">{children}</div>
      </main>
    </>
  );
};
export default LearnLayout;
