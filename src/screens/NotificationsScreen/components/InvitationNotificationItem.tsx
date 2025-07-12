import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InvitationNotificationItemProps {
  title: string;
  description?: string;
  time?: string;
  onAccept: () => void;
  onDecline: () => void;
}

const InvitationNotificationItem: React.FC<InvitationNotificationItemProps> = ({
  title,
  description,
  time,
  onAccept,
  onDecline,
}) => {
  return (
    <View style={styles.container}>
      <Icon
        name="account-plus-outline"
        size={30}
        color="#007bff"
        style={styles.icon}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        {time && <Text style={styles.time}>{time}</Text>}

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.button, styles.accept]} onPress={onAccept}>
            <Text style={styles.buttonText}>Chấp nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.decline]} onPress={onDecline}>
            <Text style={styles.buttonText}>Từ chối</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InvitationNotificationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e6f0ff',
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  accept: {
    backgroundColor: '#28a745',
  },
  decline: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
