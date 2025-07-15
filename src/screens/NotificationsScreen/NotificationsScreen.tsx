import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NotificationItem from './components/NotificationItem';
import WarningNotificationItem from './components/WarningNotificationItem';
import AlarmNotificationItem from './components/AlarmNotificationItem';
import InvitationNotificationItem from './components/InvitationNotificationItem';
import InvitationResponseNotificationItem from './components/InvitationResponseNotificationItem';

import { getNotificationsPaged, Notification } from '../../services/api/notificationApi';
import { acceptInvitation, declineInvitation } from '../../services/api/inviteMemberApi';
import useNotificationStore from '../../store/useNotificationStore';

const PAGE_SIZE = 20;

const NotificationsScreen: React.FC = () => {
  const {
    notifications,
    appendNotifications,
    updateNotificationStatus,
    hasMore,
    setHasMore,
  } = useNotificationStore();

  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const loadMoreNotifications = useCallback(async () => {
    if (loading) return;
    if (hasMore === false) return; // ✅ vẫn cho phép load nếu hasMore = 0 hoặc true

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const skip = notifications?.length ?? 0;
      console.log('🔎 Loading notifications | skip:', skip, 'limit:', PAGE_SIZE);

      const newNotifications = await getNotificationsPaged(token, skip, PAGE_SIZE);

      if (newNotifications.length < PAGE_SIZE) {
        setHasMore(false);
      }

      appendNotifications(newNotifications);
    } catch (error) {
      console.error('❌ Fetch notifications paged error:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, notifications, appendNotifications, setHasMore]);

  const handleAccept = async (item: Notification) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;
    if (!item.invitationDataId?._id) {
      console.warn('❌ invitationDataId undefined, không thể Accept');
      return;
    }

    try {
      await acceptInvitation(token, item.invitationDataId._id);
      updateNotificationStatus(item._id, 'accepted');
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Bạn đã tham gia home thành công.',
        position: 'top',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error('❌ Accept invitation error:', error);
    }
  };

  const handleDecline = async (item: Notification) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;
    if (!item.invitationDataId?._id) {
      console.warn('❌ invitationDataId undefined, không thể decline');
      return;
    }

    try {
      await declineInvitation(token, item.invitationDataId._id);
      updateNotificationStatus(item._id, 'declined');
      Toast.show({
        type: 'info',
        text1: 'Đã từ chối lời mời',
        position: 'top',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error('❌ Decline invitation error:', error);
    }
  };

  const renderItem = ({ item }: { item: Notification }) => {
    const timeStr = new Date(item.createdAt).toLocaleString();

    switch (item.type) {
      case 'warning':
        return (
          <WarningNotificationItem
            title={item.title}
            description={item.message}
            time={timeStr}
          />
        );
      case 'alarm':
        return (
          <AlarmNotificationItem
            title={item.title}
            description={item.message}
            time={timeStr}
          />
        );
      case 'invitation': {
        const inviterName = item.invitationDataId?.inviter?.name ?? 'Người mời';
        const homeName = item.invitationDataId?.home?.name? `Home "${item.invitationDataId.home.name}"`: 'Home';

        const role = item.invitationDataId?.role ?? 'member';
        const message = item.invitationDataId?.message || 'Bạn đã được mời tham gia home này.';

        const status = item.invitationDataId?.status ?? 'pending';

        return (
          <InvitationNotificationItem
            title={item.title}
            description={`${inviterName} đã mời bạn vào ${homeName} với vai trò ${role}.\n\nThông điệp: ${message}`}
            time={timeStr}
            status={status}
            onAccept={() => handleAccept(item)}
            onDecline={() => handleDecline(item)}
          />
        );}
      case 'invitation_response': {
        const inviteeName = item.invitationDataId?.invitee?.name ?? 'Người tham gia';
        const homeName = item.invitationDataId?.home?.name
          ? `Home "${item.invitationDataId.home.name}"`
          : 'Home';
        const status = item.invitationDataId?.status ?? 'declined';
        const role = item.invitationDataId?.role === 'member' ? 'thành viên' : 'quản trị viên';

        if (status !== 'accepted' && status !== 'declined') {
          return null;
        }

        const responseAction = status === 'declined' ? 'từ chối' : 'đồng ý';

        const description =
          item.title === 'Thành viên mới'
            ? `${inviteeName} vừa trở thành ${role} của ${homeName}.`
            : `${inviteeName} đã ${responseAction} lời mời tham gia ${homeName}.`;

        return (
          <InvitationResponseNotificationItem
            title={item.title}
            description={description}
            time={timeStr}
            status={status}
          />
        );
      }

      default:
        return (
          <NotificationItem
            title={item.title}
            description={item.message}
            time={timeStr}
          />
        );
    }
  };

  if (!showContent) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications || []}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        onEndReached={loadMoreNotifications}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator style={{ marginVertical: 16 }} size="small" />
          ) : null
        }
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  contentContainer: { padding: 16 },
});
