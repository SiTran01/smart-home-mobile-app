// src/api/authApi.ts
import api from '../axiosInstance'; // ✅ import instance đã config

export interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
  token: string;
}

// ✅ Hàm login user
export const loginUser = async (email: string, password: string): Promise<User> => {
  const response = await api.post<User>('/login', { email, password });
  return response.data;
};

// ✅ Hàm fetch user info từ token
export const fetchUserInfo = async (token: string): Promise<User> => {
  console.log('[fetchUserInfo] baseURL:', api.defaults.baseURL);
  const response = await api.get<User>('/auth/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
