import { create } from 'zustand';
import { Room } from '../services/api/roomApi'; // chỉnh path nếu khác

interface RoomStore {
  rooms: Room[];
  selectedRoomId: string | null;

  setRooms: (rooms: Room[]) => void;
  addRoom: (room: Room) => void;
  updateRoom: (room: Room) => void;
  deleteRoom: (roomId: string) => void;

  setSelectedRoomId: (roomId: string | null) => void;

  selectedRoom: () => Room | null; // selector tiện dụng
  resetStore: () => void; // 🔥 thêm dòng này
}

const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: [],
  selectedRoomId: null,

  setRooms: (rooms) => {
    set((state) => ({
      rooms,
      selectedRoomId:
        !state.selectedRoomId || !rooms.find((r) => r._id === state.selectedRoomId)
          ? rooms.length > 0
            ? rooms[0]._id
            : null
          : state.selectedRoomId,
    }));
  },

  addRoom: (room) =>
    set((state) => ({
      rooms: [...state.rooms, room],
      selectedRoomId: state.selectedRoomId || room._id,
    })),

  updateRoom: (updatedRoom) =>
    set((state) => ({
      rooms: state.rooms.map((r) => (r._id === updatedRoom._id ? updatedRoom : r)),
    })),

  deleteRoom: (roomId) =>
    set((state) => {
      const newRooms = state.rooms.filter((r) => r._id !== roomId);
      return {
        rooms: newRooms,
        selectedRoomId:
          state.selectedRoomId === roomId
            ? newRooms.length > 0
              ? newRooms[0]._id
              : null
            : state.selectedRoomId,
      };
    }),

  setSelectedRoomId: (roomId) => set({ selectedRoomId: roomId }),

  selectedRoom: () => {
    const { rooms, selectedRoomId } = get();
    return rooms.find((r) => r._id === selectedRoomId) || null;
  },

  resetStore: () => set({ rooms: [], selectedRoomId: null }),
}));

export default useRoomStore;
