
import { create } from 'zustand';

type NewCategoryState = {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewCategory = create<NewCategoryState>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false })
}));