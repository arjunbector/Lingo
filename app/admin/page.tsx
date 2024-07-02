import { isAdmin } from "@/lib/admin";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
const App = dynamic(()=>import("./app"), {ssr:false})

const Page = async () => {
    if(!isAdmin()) redirect("/")
  return (
    <div>
      <App />
    </div>
  );
};

export default Page;
