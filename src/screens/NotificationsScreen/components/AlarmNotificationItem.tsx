import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AlarmNotificationItemProps {
  title: string;
  description?: string;
  time?: string;
}

const AlarmNotificationItem: React.FC<AlarmNotificationItemProps> = ({
  title,
  description,
  time,
}) => {
  return (
    <View style={[styles.notificationItem, { backgroundColor: '#ffe6e6' }]}>
      <Icon
        name="alarm-light-outline"
        size={24}
        color="#f44336"
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

export default AlarmNotificationItem;

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    marginBottom: 20,
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
