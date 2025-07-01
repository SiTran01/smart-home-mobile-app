import axios from 'axios';

export interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
  token: string;
}

// ✅ Tạo axios instance với baseURL
const api = axios.create({
  baseURL: 'http://192.168.0.104:5000/api', 
  timeout: 5000,
});

// ✅ Hàm login user
export const loginUser = async (email: string, password: string): Promise<User> => {
  const response = await api.post<User>('/login', { email, password });
  return response.data;
};

// ✅ Hàm fetch user info từ token
export const fetchUserInfo = async (token: string): Promise<User> => {
  const response = await api.get<User>('/auth/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default api;
