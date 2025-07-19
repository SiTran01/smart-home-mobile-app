import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Room {
  _id: string;
  name: string;
  area: string;
}

export interface Home {
  _id: string;
  name: string;
  owner?: string;
  rooms?: Room[];
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
    alias: string;
  }[];
}

interface HomeStore {
  homes: Home[];
  selectedHomeId: string | null;

  setHomes: (homes: Home[]) => void;
  addHome: (home: Home) => void;
  updateHome: (home: Home) => void;
  deleteHome: (homeId: string) => void;

  addMemberToHome: (homeId: string, member: Home["members"][0]) => void;

  addRoomToHome: (homeId: string, room: Room) => void;
  updateRoomInHome: (homeId: string, room: Room) => void;
  deleteRoomFromHome: (homeId: string, roomId: string) => void;

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

      console.log(`🏠 [HomeStore] Added home: ${home.name} (${home._id})`);
      return {
        homes: [...state.homes, home],
        selectedHomeId: newSelectedHomeId,
      };
    }),

  updateHome: (updatedHome) =>
    set((state) => ({
      homes: state.homes.map((h) =>
        h._id === updatedHome._id
          ? {
              ...h,
              name: updatedHome.name,
              rooms: updatedHome.rooms ?? h.rooms,
            }
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

      console.log(`🗑️ [HomeStore] Deleted home ${homeId}`);
      return {
        homes: newHomes,
        selectedHomeId: newSelectedHomeId,
      };
    }),

  addMemberToHome: (homeId, member) =>
    set((state) => {
      console.log(`🔧 [HomeStore] Adding member to homeId=${homeId}`, member);

      const updatedHomes = state.homes.map((h) => {
        if (h._id === homeId) {
          return {
            ...h,
            members: [...(h.members || []), member],
          };
        }
        return h;
      });

      return { homes: updatedHomes };
    }),

  addRoomToHome: (homeId, room) =>
    set((state) => {
      const updatedHomes = state.homes.map((h) => {
        if (h._id === homeId) {
          return {
            ...h,
            rooms: [...(h.rooms || []), room],
          };
        }
        return h;
      });

      console.log(`✅ [HomeStore] Added room ${room._id} to home ${homeId}`);
      return { homes: updatedHomes };
    }),

  updateRoomInHome: (homeId, updatedRoom) =>
    set((state) => {
      const updatedHomes = state.homes.map((h) => {
        if (h._id === homeId) {
          return {
            ...h,
            rooms: h.rooms?.map((r) =>
              r._id === updatedRoom._id ? { ...r, ...updatedRoom } : r
            ),
          };
        }
        return h;
      });

      console.log(`✅ [HomeStore] Updated room ${updatedRoom._id} in home ${homeId}`);
      return { homes: updatedHomes };
    }),

  deleteRoomFromHome: (homeId, roomId) =>
    set((state) => {
      const updatedHomes = state.homes.map((h) => {
        if (h._id === homeId) {
          return {
            ...h,
            rooms: h.rooms?.filter((r) => r._id !== roomId),
          };
        }
        return h;
      });

      console.log(`🗑️ [HomeStore] Deleted room ${roomId} from home ${homeId}`);
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
