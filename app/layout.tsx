import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import ExitModal from "@/components/modals/exit-modal";
import HeartsModal from "@/components/modals/hearts-modal";
import PracticeModal from "@/components/modals/practice-modal.tsx";
import { constructMetadata } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react"

const font = Nunito({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <PracticeModal />
          <HeartsModal />
          <ExitModal />
          {children}
          <Analytics/>
        </body>
      </html>
    </ClerkProvider>
  );
}
