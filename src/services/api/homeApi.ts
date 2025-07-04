import api from '../axiosInstance';

export interface Home {
  _id: string;
  name: string;
  location: string;
  // thêm field khác theo schema backend
}

export const getAllHomes = async (token: string): Promise<Home[]> => {
  const response = await api.get<Home[]>('/home/gethomes', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

interface CreateHomeDto {
  name: string;
}

export const createHome = async (token: string, data: CreateHomeDto): Promise<Home> => {
  console.log('🔑 [createHome] Token:', token);
  console.log('📦 [createHome] Data:', data);
  const response = await api.post<Home>('/home/createhomes', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


// 🗑️ Hàm xóa Home
interface DeleteHomeResponse {
  message: string;
}

export const deleteHome = async (token: string, homeId: string): Promise<DeleteHomeResponse> => {
  const response = await api.delete<DeleteHomeResponse>(`/home/${homeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('🗑️ Delete home response:', response.data); // ✅ Thêm log này để thấy
  return response.data;
};


interface UpdateHomeDto {
  name?: string;
  // thêm các field có thể update
}

export const updateHome = async (
  token: string,
  homeId: string,
  data: UpdateHomeDto
): Promise<Home> => {
  console.log('🔑 [updateHome] Token:', token);
  console.log('📝 [updateHome] Data:', data);
  const response = await api.put<Home>(`/home/${homeId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
