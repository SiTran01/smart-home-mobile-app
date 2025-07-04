import api from '../axiosInstance';

export interface Room {
  _id: string;
  name: string;
  home: string; // hoặc homeId tuỳ theo schema mày đặt
  // thêm field khác nếu cần
}

// 🔍 Get all rooms in a home
export const getAllRooms = async (token: string, homeId: string): Promise<Room[]> => {
  const response = await api.get<Room[]>(`/room/getrooms/${homeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ➕ Create room
interface CreateRoomDto {
  name: string;
  homeId: string; // hoặc homeId
}

export const createRoom = async (
  token: string,
  data: CreateRoomDto
): Promise<Room> => {
  console.log('🔑 [createRoom] Token:', token);
  console.log('📦 [createRoom] Data:', data);
  const response = await api.post<Room>('/room/createroom', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 🗑️ Delete room
interface DeleteRoomResponse {
  message: string;
}

export const deleteRoom = async (
  token: string,
  roomId: string
): Promise<DeleteRoomResponse> => {
  const response = await api.delete<DeleteRoomResponse>(`/room/${roomId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('🗑️ Delete room response:', response.data);
  return response.data;
};

// ✏️ Update room
interface UpdateRoomDto {
  name?: string;
  // thêm các field có thể update
}

export const updateRoom = async (
  token: string,
  roomId: string,
  data: UpdateRoomDto
): Promise<Room> => {
  console.log('🔑 [updateRoom] Token:', token);
  console.log('📝 [updateRoom] Data:', data);
  const response = await api.put<Room>(`/room/${roomId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
