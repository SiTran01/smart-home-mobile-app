import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface WarningNotificationItemProps {
  title: string;
  description?: string;
  time?: string;
}

const WarningNotificationItemComponent: React.FC<WarningNotificationItemProps> = ({
  title,
  description,
  time,
}) => {
  return (
    <View style={[styles.notificationItem, { backgroundColor: '#fff7e6' }]}>
      <Icon
        name="alert-circle-outline"
        size={24}
        color="#ff9800"
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

export default React.memo(WarningNotificationItemComponent);

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
