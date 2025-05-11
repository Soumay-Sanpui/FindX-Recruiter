import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useEmployerStore = create(
    persist(
        (set) => ({
            employer: null,
            token: null,
            isAuthenticated: false,
            
            setEmployer: (employer) => set({ 
                employer, 
                isAuthenticated: !!employer 
            }),
            
            setToken: (token) => set({ token }),
            
            logout: () => set({ 
                employer: null, 
                token: null, 
                isAuthenticated: false 
            }),
        }),
        {
            name: 'employer-storage',
            getStorage: () => localStorage,
            partialize: (state) => ({ 
                employer: state.employer,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);
