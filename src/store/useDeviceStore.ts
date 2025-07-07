import { create } from 'zustand';
import { Device } from '../services/api/deviceApi'; // chỉnh path theo project mày

interface DeviceStore {
  devices: Device[];

  setDevices: (devices: Device[]) => void;
  addDevice: (device: Device) => void;
  updateDevice: (device: Device) => void;
  deleteDevice: (deviceId: string) => void;
}

const useDeviceStore = create<DeviceStore>((set) => ({
  devices: [],

  setDevices: (devices) => set({ devices }),

  addDevice: (device) =>
    set((state) => ({
      devices: [...state.devices, device],
    })),

  updateDevice: (updatedDevice) =>
    set((state) => ({
      devices: state.devices.map((d) => (d._id === updatedDevice._id ? updatedDevice : d)),
    })),

  deleteDevice: (deviceId) =>
    set((state) => ({
      devices: state.devices.filter((d) => d._id !== deviceId),
    })),
}));

export default useDeviceStore;
