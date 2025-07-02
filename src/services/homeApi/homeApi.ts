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
