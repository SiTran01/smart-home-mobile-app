import { create } from 'zustand';
import { Home } from '../services/homeApi/homeApi'; // chỉnh path theo project

interface HomeStore {
  homes: Home[];
  setHomes: (homes: Home[]) => void;
  addHome: (home: Home) => void;
  updateHome: (home: Home) => void;
  deleteHome: (homeId: string) => void;
}

const useHomeStore = create<HomeStore>((set) => ({
  homes: [],
  setHomes: (homes) => set({ homes }),
  addHome: (home) => set((state) => ({ homes: [...state.homes, home] })),
  updateHome: (updatedHome) =>
    set((state) => ({
      homes: state.homes.map((h) => (h._id === updatedHome._id ? updatedHome : h)),
    })),
  deleteHome: (homeId) =>
    set((state) => ({
      homes: state.homes.filter((h) => h._id !== homeId),
    })),
}));

export default useHomeStore;
