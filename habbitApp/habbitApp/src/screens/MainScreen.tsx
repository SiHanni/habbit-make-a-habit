import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllHabitInfo} from '../services/api';

type Props = {
  username: string | null;
};

const MainScreen: React.FC<Props> = ({username}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [habits, setHabits] = useState([]);
  const navigation = useNavigation<any>();

  const fetchHabits = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        console.log('USER', parsedUser);
        const habitData = await getAllHabitInfo(parsedUser.userId);
        setHabits(habitData);
        console.log('habit:', habitData);
      } else {
        console.warn('User data not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Failed to fetch habit info:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchHabits();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchHabits();
    });

    return unsubscribe;
  }, [navigation]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const openSettings = () => {
    navigation.navigate('Settings');
  };

  const openHabitDetail = (habitId: number) => {
    navigation.navigate('HabitDetail', {habitId});
  };

  const renderHabitItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.habitItem}
      onPress={() => openHabitDetail(item.habitId)}>
      <Text style={styles.habitText}>Habit: {item.mainGoal}</Text>
      <Text style={styles.habitText}>Daily Goal: {item.dailyGoal}</Text>
      <Text style={styles.habitText}>Time: {item.dailyGoalTime}분</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateText}>{formatDate(currentDateTime)}</Text>
          <Text style={styles.timeText}>{formatTime(currentDateTime)}</Text>
        </View>
        <TouchableOpacity onPress={openSettings} style={styles.settingsButton}>
          <FontAwesome name="cog" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>열심히 살자! {username} 야</Text>
      <View style={styles.habitListContainer}>
        <FlatList
          data={habits}
          renderItem={renderHabitItem}
          keyExtractor={item => item.habitId.toString()}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true} // Optimize memory usage
          initialNumToRender={10} // Adjust based on expected number of items
          maxToRenderPerBatch={10} // Adjust based on expected number of items
          windowSize={21} // Adjust based on expected number of items
          getItemLayout={(_, index) => ({
            length: 100, // Adjust length based on item size
            offset: 100 * index, // Offset for current index
            index,
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#F5F5F5',
  },
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30, // Adjust this based on status bar height
  },
  dateTimeContainer: {
    flexDirection: 'column',
  },
  dateText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 16,
  },
  settingsButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 80, // Adjust this margin to fit with the top container
    marginBottom: 20,
  },
  habitListContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  habitListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  habitItem: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 2}, // For iOS shadow
    shadowOpacity: 0.1, // For iOS shadow
    shadowRadius: 4, // For iOS shadow
  },
  habitText: {
    fontSize: 16,
    color: '#333',
  },
});

export default MainScreen;
