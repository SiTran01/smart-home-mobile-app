import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import HouseCard from '../components/HouseCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const houses = [
  { id: '1', name: 'Nhà A' },
  { id: '2', name: 'Nhà B' },
  { id: '3', name: 'Nhà C' },
  { id: '4', name: 'Nhà D' },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleHousePress = (house: { id: string; name: string }) => {
    navigation.navigate('HouseDetail', {
      id: house.id,
      name: house.name,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách Nhà</Text>
      <FlatList
        data={houses}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <HouseCard name={item.name} onPress={() => handleHousePress(item)} />
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 8,
  },
});
