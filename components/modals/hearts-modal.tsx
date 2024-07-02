"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useHeartsModal } from "@/store/use-herts-model";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
const HeartsModal = () => {
  const router = useRouter();
  const onClick = () => {
    close();
    router.push("/store");
  };
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image src="/mascot_bad.svg" alt="mascot" height={80} width={80} />
          </div>
          <DialogTitle className="text-center text-3xl font-bold">
            You ran out of hearts!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Get{" "}
            <span className="rounded-md bg-yellow-500 px-1.5 text-white">
              Pro
            </span>{" "}
            for unlimited hearts, or purchase them in the store
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={onClick}
            >
              Get Unlimited Hearts
            </Button>
            <Button
              variant="primaryOutline"
              className="w-full"
              size="lg"
              onClick={close}
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeartsModal;
