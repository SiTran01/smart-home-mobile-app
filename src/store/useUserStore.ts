import { create } from 'zustand';

interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
  token: string;
}

interface UserStore {
  user: User | null;
  setUser: (userData: User | null) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
