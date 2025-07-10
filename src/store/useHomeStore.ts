import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  resetStore: () => void; // 🔥 thêm dòng này
}

const useHomeStore = create<HomeStore>((set, get) => ({
  homes: [],
  selectedHomeId: null,

  setHomes: (homes) => {
  set((state) => ({
    homes,
    selectedHomeId:
      state.selectedHomeId && homes.find(h => h._id === state.selectedHomeId)
        ? state.selectedHomeId
        : homes.length > 0
          ? homes[0]._id
          : null,
  }));
},


  addHome: (home) =>
    set((state) => {
      const newSelectedHomeId = state.selectedHomeId || home._id;

      // ✅ lưu vào AsyncStorage
      AsyncStorage.setItem('selectedHomeId', newSelectedHomeId);

      return {
        homes: [...state.homes, home],
        selectedHomeId: newSelectedHomeId,
      };
    }),

  updateHome: (updatedHome) =>
    set((state) => ({
      homes: state.homes.map((h) => (h._id === updatedHome._id ? updatedHome : h)),
    })),

  deleteHome: (homeId) =>
    set((state) => {
      const newHomes = state.homes.filter((h) => h._id !== homeId);
      const newSelectedHomeId =
        state.selectedHomeId === homeId
          ? newHomes.length > 0
            ? newHomes[0]._id
            : null
          : state.selectedHomeId;

      // ✅ cập nhật AsyncStorage
      if (newSelectedHomeId) {
        AsyncStorage.setItem('selectedHomeId', newSelectedHomeId);
      } else {
        AsyncStorage.removeItem('selectedHomeId');
      }

      return {
        homes: newHomes,
        selectedHomeId: newSelectedHomeId,
      };
    }),

  setSelectedHomeId: (homeId) => {
  set({ selectedHomeId: homeId });
  if (homeId) {
    AsyncStorage.setItem('selectedHomeId', homeId);
  } else {
    AsyncStorage.removeItem('selectedHomeId');
  }
},

  selectedHome: () => {
    const { homes, selectedHomeId } = get();
    return homes.find((h) => h._id === selectedHomeId) || null;
  },

  resetStore: () => {
  set({ homes: [], selectedHomeId: null });
  AsyncStorage.removeItem('selectedHomeId');
},


}));


export default useHomeStore;
