import { create } from 'zustand';
import { Home } from '../services/api/homeApi';

interface HomeStore {
  homes: Home[];
  selectedHomeId: string | null;

  setHomes: (homes: Home[]) => void;
  addHome: (home: Home) => void;
  updateHome: (home: Home) => void;
  deleteHome: (homeId: string) => void;

  setSelectedHomeId: (homeId: string | null) => void;

  selectedHome: () => Home | null; // selector tiện dụng
}

const useHomeStore = create<HomeStore>((set, get) => ({
  homes: [],
  selectedHomeId: null,

  setHomes: (homes) => {
    set((state) => ({
      homes,
      // Nếu không có selectedHomeId hoặc selectedHomeId không tồn tại trong list mới ➔ set về home đầu tiên
      selectedHomeId:
        !state.selectedHomeId || !homes.find((h) => h._id === state.selectedHomeId)
          ? homes.length > 0
            ? homes[0]._id
            : null
          : state.selectedHomeId,
    }));
  },

  addHome: (home) =>
    set((state) => ({
      homes: [...state.homes, home],
      // Nếu chưa có home nào được chọn ➔ set home mới này làm selected
      selectedHomeId: state.selectedHomeId || home._id,
    })),

  updateHome: (updatedHome) =>
    set((state) => ({
      homes: state.homes.map((h) => (h._id === updatedHome._id ? updatedHome : h)),
    })),

  deleteHome: (homeId) =>
    set((state) => {
      const newHomes = state.homes.filter((h) => h._id !== homeId);
      return {
        homes: newHomes,
        selectedHomeId:
          state.selectedHomeId === homeId
            ? newHomes.length > 0
              ? newHomes[0]._id
              : null
            : state.selectedHomeId,
      };
    }),

  setSelectedHomeId: (homeId) => set({ selectedHomeId: homeId }),

  selectedHome: () => {
    const { homes, selectedHomeId } = get();
    return homes.find((h) => h._id === selectedHomeId) || null;
  },
}));

export default useHomeStore;
