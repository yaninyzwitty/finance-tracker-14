
import { create } from 'zustand';

type NewTransactionState = {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewTransaction = create<NewTransactionState>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false })
}));