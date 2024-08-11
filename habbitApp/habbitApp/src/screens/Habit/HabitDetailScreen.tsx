import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';

// HabitDetailScreen에서 필요한 Props 타입 정의
type HabitDetailScreenRouteProp = RouteProp<RootStackParamList, 'HabitDetail'>;
type HabitDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HabitDetail'
>;

type HabitDetailScreenProps = {
  route: HabitDetailScreenRouteProp;
  navigation: HabitDetailScreenNavigationProp;
};

const HabitDetailScreen: React.FC<HabitDetailScreenProps> = ({route}) => {
  const {habitId} = route.params; // route.params에서 habitId 가져오기

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Detail Screen</Text>
      <Text>Habit ID: {habitId}</Text>
      {/* habitId를 이용해 더 상세한 정보를 표시할 수 있음 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HabitDetailScreen;
