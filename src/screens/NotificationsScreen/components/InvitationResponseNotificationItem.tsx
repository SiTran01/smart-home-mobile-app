import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InvitationResponseNotificationItemProps {
  title: string;
  description?: string;
  time?: string;
  status: 'accepted' | 'declined';
}

const InvitationResponseNotificationItem: React.FC<InvitationResponseNotificationItemProps> = ({
  title,
  description,
  time,
  status,
}) => {
  const isAccepted = status === 'accepted';

  return (
    <View style={styles.container}>
      <Icon
        name={isAccepted ? 'account-check-outline' : 'account-cancel-outline'}
        size={30}
        color={isAccepted ? '#28a745' : '#dc3545'}
        style={styles.icon}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        {time && <Text style={styles.time}>{time}</Text>}
      </View>
    </View>
  );
};

export default React.memo(InvitationResponseNotificationItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#1a1a1a',
  },
  description: {
    color: '#444',
    marginBottom: 8,
  },
  time: {
    color: '#888',
    fontSize: 12,
    marginBottom: 8,
  },
});
