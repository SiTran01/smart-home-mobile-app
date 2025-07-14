
import io from 'socket.io-client';
import { SOCKET_URL } from '../../constants/env';

// Tạo socket instance
const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket'],
});

// ⚡ Log khi connect thành công
socket.on('connect', () => {
  console.log('🔌 [socket.ts] Socket connected:', socket.id);
});

// ⚠️ Log khi disconnect
socket.on('disconnect', (reason) => {
  console.warn('🔌 [socket.ts] Socket disconnected:', reason);
});

// ❌ Log khi error
socket.on('connect_error', (error) => {
  console.error('❌ [socket.ts] Socket connection error:', error.message, error);
});

export default socket;
