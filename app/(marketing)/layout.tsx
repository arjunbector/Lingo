import Footer from "./Footer";
import Header from "./Header";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <Footer/>
    </div>
  );
};
export default MarketingLayout;
