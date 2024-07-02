import { create } from "zustand"

type PracticeModal = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const usePracticeModal = create<PracticeModal>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}))