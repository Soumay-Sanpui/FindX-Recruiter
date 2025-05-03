import { create } from 'zustand';

export const useEmployerStore = create((set) => ({
    employer: null,
    setEmployer: (employer) => set({ employer }),
}));
