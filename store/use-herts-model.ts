import { create } from "zustand"

type HeartsModal = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useHeartsModal = create<HeartsModal>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}))