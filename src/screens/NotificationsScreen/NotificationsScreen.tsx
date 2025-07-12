import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NotificationItem from './components/NotificationItem';
import WarningNotificationItem from './components/WarningNotificationItem';
import AlarmNotificationItem from './components/AlarmNotificationItem';
import InvitationNotificationItem from './components/InvitationNotificationItem';

import { getAllNotifications, Notification } from '../../services/api/notificationApi';

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log('🔑 [NotificationsScreen] Token:', token);

      if (token) {
        try {
          const data = await getAllNotifications(token);
          console.log('📦 [NotificationsScreen] Notifications data:', data);
          setNotifications(data);
        } catch (error) {
          console.error('❌ [NotificationsScreen] Failed to fetch notifications:', error);
        }
      } else {
        console.warn('⚠️ [NotificationsScreen] No access token found');
      }
    };

    fetchNotifications();
  }, []);

  // 👉 Handler Accept Invitation
  const handleAccept = (invitationId?: string) => {
    console.log('✅ Accepted invitation:', invitationId);
    // TODO: Call accept invitation API here
  };

  // 👉 Handler Decline Invitation
  const handleDecline = (invitationId?: string) => {
    console.log('❌ Declined invitation:', invitationId);
    // TODO: Call decline invitation API here
  };

  const renderItem = ({ item }: { item: Notification }) => {
    console.log('📝 [NotificationsScreen] Rendering item:', item);

    switch (item.type) {
      case 'warning':
        return (
          <WarningNotificationItem
            title={item.title}
            description={item.message}
            time={new Date(item.createdAt).toLocaleString()}
          />
        );
      case 'alarm':
        return (
          <AlarmNotificationItem
            title={item.title}
            description={item.message}
            time={new Date(item.createdAt).toLocaleString()}
          />
        );
      case 'invitation':
        return (
          <InvitationNotificationItem
            title={item.title}
            description={item.message}
            time={new Date(item.createdAt).toLocaleString()}
            onAccept={() => handleAccept(item.data?.invitationId)}
            onDecline={() => handleDecline(item.data?.invitationId)}
          />
        );
      default:
        return (
          <NotificationItem
            title={item.title}
            description={item.message}
            time={new Date(item.createdAt).toLocaleString()}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
  },
});
