"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePracticeModal } from "@/store/use-practice-modal";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
const PracticeModal = () => {
  const { isOpen, close } = usePracticeModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Heart className="h-16 w-16 fill-red-400 stroke-red-500" />
          </div>
          <DialogTitle className="text-center text-3xl font-bold">
            Practice Lesson
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Use Practice lessons to regain hearts and points. You cannot loose
            hearts and points in Practice lesson.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button
              variant="primary"
              className="w-full uppercase"
              size="lg"
              onClick={close}
            >
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PracticeModal;
