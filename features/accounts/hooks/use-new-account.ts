
import { create } from 'zustand';

type NewAccountState = {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewAccount = create<NewAccountState>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false })
}));