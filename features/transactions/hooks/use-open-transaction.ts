
import { create } from 'zustand';

type OpenAccountState = {
    id?: string;
    open: boolean;
    onOpen: (id?: string) => void;
    onClose: () => void;
}

export const useOpenTransaction = create<OpenAccountState>((set) => ({
    id: undefined,
    open: false,
    onOpen: (id) => set({ open: true, id }),
    onClose: () => set({ open: false, id: undefined  })
}));