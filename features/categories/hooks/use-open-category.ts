
import { create } from 'zustand';

type OpenCategoryState = {
    id?: string;
    open: boolean;
    onOpen: (id?: string) => void;
    onClose: () => void;
}

export const useOpenCategory = create<OpenCategoryState>((set) => ({
    id: undefined,
    open: false,
    onOpen: (id) => set({ open: true, id }),
    onClose: () => set({ open: false, id: undefined  })
}));