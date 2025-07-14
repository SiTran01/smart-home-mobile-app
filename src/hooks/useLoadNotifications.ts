// src/hooks/useLoadNotifications.ts
import { useEffect, useCallback, useRef, useState } from 'react';
import useNotificationStore from '../store/useNotificationStore';
import { getNotificationsPaged } from '../services/api/notificationApi';

const PAGE_SIZE = 20; // Số lượng notifications mỗi lần load

const useLoadNotifications = (token: string | null) => {
  const setNotifications = useNotificationStore(state => state.setNotifications);
  const addNotification = useNotificationStore(state => state.addNotification);
  
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const [page, setPage] = useState(0);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const loadNotifications = useCallback(
    async (pageNumber: number) => {
      if (loadingRef.current || !hasMoreRef.current || !token) {
        console.log(`[useLoadNotifications] Skip load: loading=${loadingRef.current}, hasMore=${hasMoreRef.current}, token=${token}`);
        return;
      }

      loadingRef.current = true;
      console.log(`[useLoadNotifications] Loading page ${pageNumber}`);

      try {
        const newNotifications = await getNotificationsPaged(token, pageNumber * PAGE_SIZE, PAGE_SIZE);
        console.log(`[useLoadNotifications] Fetched ${newNotifications.length} notifications`);

        if (newNotifications.length < PAGE_SIZE) {
          hasMoreRef.current = false;
          console.log('[useLoadNotifications] No more pages');
        }

        if (pageNumber === 0) {
          setNotifications(newNotifications);
          console.log('[useLoadNotifications] Set initial notifications to store');
        } else {
          newNotifications.forEach(n => addNotification(n));
          console.log('[useLoadNotifications] Added notifications to store');
        }

        setPage(pageNumber);
      } catch (error) {
        console.error('❌ [useLoadNotifications] Fetch notifications error:', error);
      } finally {
        loadingRef.current = false;
        if (pageNumber === 0) setInitialLoaded(true);
      }
    },
    [token, setNotifications, addNotification]
  );

  useEffect(() => {
    if (token) {
      console.log('[useLoadNotifications] Token available, loading notifications');
      hasMoreRef.current = true;
      loadNotifications(0);
    }
  }, [token, loadNotifications]);

  const loadMore = useCallback(() => {
    if (!loadingRef.current && hasMoreRef.current) {
      console.log('[useLoadNotifications] Loading more...');
      loadNotifications(page + 1);
    }
  }, [loadNotifications, page]);

  return {
    initialLoaded,
    loadMore,
  };
};

export default useLoadNotifications;
