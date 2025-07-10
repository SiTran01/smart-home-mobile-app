import api from '../axiosInstance';

export interface Home {
  _id: string;
  name: string;
  location?: string;
  owner?: string;
  members?: {
    user: string;
    role: 'admin' | 'user';
  }[];
  rooms?: string[];
  devices?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// ✅ Lấy toàn bộ homes
export const getAllHomes = async (token: string): Promise<Home[]> => {
  console.log('🔑 [getAllHomes] Token:', token);
  const response = await api.get<Home[]>('/home/gethomes', {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('📦 [getAllHomes] Response:', response.data);
  return response.data;
};

interface CreateHomeDto {
  name: string;
}

// ✅ Tạo home mới
export const createHome = async (token: string, data: CreateHomeDto): Promise<Home> => {
  console.log('🔑 [createHome] Token:', token);
  console.log('📦 [createHome] Data:', data);
  const response = await api.post<Home>('/home/createhomes', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('✅ [createHome] Response:', response.data);
  return response.data;
};

interface DeleteHomeResponse {
  message: string;
}

// ✅ Xóa home
export const deleteHome = async (token: string, homeId: string): Promise<DeleteHomeResponse> => {
  console.log('🔑 [deleteHome] Token:', token);
  console.log('🗑️ [deleteHome] homeId:', homeId);
  const response = await api.delete<DeleteHomeResponse>(`/home/${homeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('✅ [deleteHome] Response:', response.data);
  return response.data;
};

interface UpdateHomeDto {
  name?: string;
  // thêm các field có thể update nếu backend cho phép
}

// ✅ Update home
export const updateHome = async (
  token: string,
  homeId: string,
  data: UpdateHomeDto
): Promise<Home> => {
  console.log('🔑 [updateHome] Token:', token);
  console.log('📝 [updateHome] homeId:', homeId);
  console.log('📝 [updateHome] Data:', data);
  const response = await api.put<Home>(`/home/${homeId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('✅ [updateHome] Response:', response.data);
  return response.data;
};
