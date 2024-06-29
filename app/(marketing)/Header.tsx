import Image from "next/image";
import logo from "@/public/fullLogo.svg";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
        <div className="flex items-center gap-x-2 pb-7 pl-4 pt-8">
          <Image src={logo} height={40} width={40} alt="duolingo" />
          <h1 className="text-xl font-extrabold tracking-wide text-green-600">
            Lingo
          </h1>
        </div>
        <ClerkLoading>
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              signUpFallbackRedirectUrl="/learn"
              fallbackRedirectUrl="/learn"
            >
              <Button variant="ghost" size="lg">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};

export default Header;
