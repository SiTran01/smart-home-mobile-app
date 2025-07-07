import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <BottomTabNavigator />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
