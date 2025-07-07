import api from '../axiosInstance';

export interface Device {
  _id: string; // MongoDB ObjectId as string
  name: string;
  type: string;
  status: any; // hoặc define rõ hơn theo device type của m
  home: string; // ObjectId as string
  room: string; // ObjectId as string (nullable nếu device không thuộc room cụ thể)
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}


// 🔍 Get all devices in a home
export const getAllDevices = async (token: string, homeId: string): Promise<Device[]> => {
  const response = await api.get<Device[]>(`/device/getdevices/${homeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ➕ Create device
interface CreateDeviceDto {
  name: string;
  type: string;
  roomId: string;
  homeId: string;
  // thêm các field cần thiết khi tạo device
}

export const createDevice = async (
  token: string,
  data: CreateDeviceDto
): Promise<Device> => {
  console.log('🔑 [createDevice] Token:', token);
  console.log('📦 [createDevice] Data:', data);
  const response = await api.post<Device>('/device/createdevice', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✏️ Update device
interface UpdateDeviceDto {
  name?: string;
  type?: string;
  status?: boolean | number | string;
  roomId?: string;
  // thêm các field có thể update
}

export const updateDevice = async (
  token: string,
  deviceId: string,
  data: UpdateDeviceDto
): Promise<Device> => {
  console.log('🔑 [updateDevice] Token:', token);
  console.log('📝 [updateDevice] Data:', data);
  const response = await api.put<Device>(`/device/${deviceId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 🗑️ Delete device
interface DeleteDeviceResponse {
  message: string;
}

export const deleteDevice = async (
  token: string,
  deviceId: string
): Promise<DeleteDeviceResponse> => {
  const response = await api.delete<DeleteDeviceResponse>(`/device/${deviceId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('🗑️ Delete device response:', response.data);
  return response.data;
};
