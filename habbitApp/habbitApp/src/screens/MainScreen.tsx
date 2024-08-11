import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {getAllHabitInfo, deleteHabit} from '../services/api';

type Props = {
  userId: number;
  username: string | null;
};

type Habit = {
  habitId: number;
  mainGoal: string;
  dailyGoal: string;
  dailyGoalTime: number;
  isActive: boolean;
};

const MainScreen: React.FC<Props> = ({userId, username}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [habits, setHabits] = useState<Habit[]>([]);
  const navigation = useNavigation<any>();

  const fetchHabits = useCallback(async () => {
    try {
      const habitData = await getAllHabitInfo(userId);
      setHabits(habitData.map((habit: any) => ({...habit, isActive: false})));
    } catch (error) {
      console.error('Failed to fetch habit info:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchHabits();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchHabits();
    });

    return unsubscribe;
  }, [fetchHabits, navigation]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleStartCancel = (habitId: number) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.habitId === habitId
          ? {...habit, isActive: !habit.isActive}
          : habit,
      ),
    );
  };

  const handleDelete = async (habitId: number) => {
    Alert.alert(
      '삭제 확인',
      '이 습관을 정말로 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteHabit(userId, habitId);
              setHabits(prevHabits =>
                prevHabits.filter(habit => habit.habitId !== habitId),
              );
            } catch (error) {
              console.error('삭제 실패:', error);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

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
    navigation.navigate('HabitDetail', {habitId, userId});
  };

  const renderHabitItem = ({item}: {item: Habit}) => (
    <View style={styles.habitItemContainer}>
      <TouchableOpacity
        style={styles.habitItem}
        onPress={() => openHabitDetail(item.habitId)}
        onLongPress={() => handleDelete(item.habitId)} // 길게 눌러서 삭제
      >
        <View style={styles.habitContentContainer}>
          <View style={styles.habitDetails}>
            <Text style={styles.habitText}>Habit: {item.mainGoal}</Text>
            <Text style={styles.habitText}>Daily Goal: {item.dailyGoal}</Text>
            <Text style={styles.habitText}>Time: {item.dailyGoalTime}분</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              item.isActive ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => handleStartCancel(item.habitId)}>
            <Text
              style={[
                styles.buttonText,
                item.isActive
                  ? styles.activeButtonText
                  : styles.inactiveButtonText,
              ]}>
              {item.isActive ? '시작' : '정지'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateText}>{formatDate(currentDateTime)}</Text>
          <Text style={styles.timeText}>{formatTime(currentDateTime)}</Text>
        </View>
        <TouchableOpacity onPress={openSettings} style={styles.settingsButton}>
          <FontAwesome name="cog" size={24} color="#87CEFA" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>열심히 살자! {username} 야</Text>

      {/* Fixed instruction block */}
      <View style={styles.instructionBlock}>
        <Text style={styles.instructionText}>
          여기에는 사용 설명이 들어갑니다. 이 앱을 사용하는 방법에 대해
          알아보세요.
        </Text>
      </View>

      <View style={styles.habitListContainer}>
        <FlatList
          data={habits}
          renderItem={renderHabitItem}
          keyExtractor={item => item.habitId.toString()}
          showsVerticalScrollIndicator={false} // 스크롤바 숨기기
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateTimeContainer: {
    alignItems: 'flex-start',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 16,
  },
  settingsButton: {
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionBlock: {
    padding: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  habitListContainer: {
    flex: 1,
  },
  habitItemContainer: {
    marginBottom: 20,
  },
  habitItem: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginRight: 10,
    position: 'relative',
  },
  habitContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  habitDetails: {
    flex: 1,
  },
  habitText: {
    fontSize: 16,
    color: '#333', // 선명한 텍스트 색상
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
    height: 40,
  },
  activeButton: {
    backgroundColor: '#76c7c0', // 파스텔 톤의 활성화된 상태 색상
  },
  inactiveButton: {
    backgroundColor: '#ff9a8b', // 파스텔 톤의 비활성화된 상태 색상
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeButtonText: {
    color: '#FFF', // 활성화된 상태의 버튼 텍스트 색상
  },
  inactiveButtonText: {
    color: '#FFF', // 비활성화된 상태의 버튼 텍스트 색상
  },
});

export default MainScreen;
