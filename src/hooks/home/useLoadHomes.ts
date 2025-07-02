import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllHomes } from '../../services/homeApi/homeApi';
import useHomeStore from '../../store/useHomeStore';
import useUserStore from '../../store/useUserStore'; // ✅ import user store

const useLoadHomes = () => {
  const setHomes = useHomeStore((state) => state.setHomes);
  const user = useUserStore((state) => state.user); // ✅ lấy user từ store

  useEffect(() => {
    const fetchHomes = async () => {
      if (!user) {
        console.log('[useLoadHomes] No user found, skipping fetch');
        return; // ✅ chỉ load khi có user
      }

      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('[useLoadHomes] No token found');
          return;
        }

        const homes = await getAllHomes(token);
        console.log('[useLoadHomes] Fetched homes:', homes);
        setHomes(homes);

      } catch (err) {
        console.error('[useLoadHomes] Failed to load homes:', err);
      }
    };

    fetchHomes();
  }, [user, setHomes]); // ✅ chạy lại khi user thay đổi
};

export default useLoadHomes;
