import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Home {
  _id: string;
  name: string;
  owner?: string;
  rooms?: string[];
  devices?: string[];
  createdAt?: string;
  updatedAt?: string;
  members: {
    user: {
      _id: string;
      name: string;
      email: string;
      picture?: string;
    };
    role: "admin" | "user";
    alias: string; // ✅ added alias as required field
  }[];
}

interface HomeStore {
  homes: Home[];
  selectedHomeId: string | null;

  setHomes: (homes: Home[]) => void;
  addHome: (home: Home) => void;
  updateHome: (home: Home) => void;
  deleteHome: (homeId: string) => void;

  addMemberToHome: (
    homeId: string,
    member: {
      user: {
        _id: string;
        name: string;
        email: string;
        picture?: string;
      };
      role: "admin" | "user";
      alias: string; // ✅ added alias to param type
    }
  ) => void;

  setSelectedHomeId: (homeId: string | null) => void;
  selectedHome: () => Home | null;
  resetStore: () => void;
}

const useHomeStore = create<HomeStore>((set, get) => ({
  homes: [],
  selectedHomeId: null,

  setHomes: (homes) => {
    set((state) => {
      let selectedHomeId: string | null;

      if (state.selectedHomeId && homes.find(h => h._id === state.selectedHomeId)) {
        selectedHomeId = state.selectedHomeId;
      } else if (homes.length > 0) {
        selectedHomeId = homes[0]._id;
      } else {
        selectedHomeId = null;
      }

      if (selectedHomeId) {
        AsyncStorage.setItem('selectedHomeId', selectedHomeId);
      } else {
        AsyncStorage.removeItem('selectedHomeId');
      }

      return { homes, selectedHomeId };
    });
  },

  addHome: (home) =>
    set((state) => {
      const newSelectedHomeId = state.selectedHomeId || home._id;
      AsyncStorage.setItem('selectedHomeId', newSelectedHomeId);

      return {
        homes: [...state.homes, home],
        selectedHomeId: newSelectedHomeId,
      };
    }),

  updateHome: (updatedHome) =>
    set((state) => ({
      homes: state.homes.map((h) =>
        h._id === updatedHome._id
          ? { ...h, name: updatedHome.name }
          : h
      ),
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

  addMemberToHome: (homeId, member) =>
    set((state) => {
      console.log(`🔧 [HomeStore] Adding member to homeId=${homeId}`);
      console.log('👤 Member data:', member);

      const updatedHomes = state.homes.map((h) => {
        if (h._id === homeId) {
          console.log(`✅ Added member to home ${homeId}:`, member);
          return {
            ...h,
            members: [...(h.members || []), member], // 👈 member now includes alias
          };
        }
        return h;
      });

      console.log('🏠 Updated homes:', updatedHomes);

      return { homes: updatedHomes };
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
