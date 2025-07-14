import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface NotificationItemProps {
  title: string;
  description?: string;
  time?: string;
}

const NotificationItemComponent: React.FC<NotificationItemProps> = ({ title, description, time }) => {
  return (
    <View style={styles.notificationItem}>
      <Icon
        name="bell-ring-outline"
        size={24}
        color="#007bff"
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        {time && <Text style={styles.time}>{time}</Text>}
      </View>
    </View>
  );
};

export default React.memo(NotificationItemComponent);

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f2f7ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 10,
    marginTop: 4,
  },
  textContainer: {
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
  },
  time: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
});
