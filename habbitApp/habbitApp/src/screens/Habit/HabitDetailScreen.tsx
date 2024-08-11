import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {getHabitInfo} from '../../services/api';

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
  const {habitId, userId} = route.params;
  const [habit, setHabit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabitDetails = async () => {
      try {
        const response = await getHabitInfo(userId, habitId);
        console.log('RERERERE<', response);
        setHabit(response);
      } catch (err) {
        console.error('Failed to fetch habit info:', err);
        setFetchError('습관 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchHabitDetails();
  }, [userId, habitId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (fetchError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{fetchError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>습관 상세 정보</Text>
      {habit ? (
        <>
          <Text style={styles.header}>습관 목표</Text>
          <Text>목표: {habit.mainGoal}</Text>
          <Text>일일 목표: {habit.dailyGoal}</Text>
          <Text>일일 목표 시간: {habit.dailyGoalTime} 분</Text>

          <Text style={styles.header}>일일 목표 목록</Text>
          {habit.dailyGoals && habit.dailyGoals.length > 0 ? (
            <FlatList
              data={habit.dailyGoals}
              keyExtractor={item => item.dailyGoalId.toString()}
              renderItem={({item}) => (
                <View style={styles.dailyGoalItem}>
                  <Text style={styles.goalId}>목표 ID: {item.dailyGoalId}</Text>
                  <Text>
                    생성 일시: {new Date(item.createdAt).toLocaleString()}
                  </Text>
                  <Text>진행 시간: {item.progressTime} 분</Text>
                  <Text>
                    완료 여부: {item.isFinished ? '완료됨' : '미완료'}
                  </Text>
                  <Text>진행 중: {item.onProgress ? '진행' : '미진행'}</Text>
                </View>
              )}
            />
          ) : (
            <Text>생성 된 일일 목표가 없습니다.</Text>
          )}
        </>
      ) : (
        <Text>진행 중인 습관 상세 정보가 없습니다.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  dailyGoalItem: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 10,
  },
  goalId: {
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default HabitDetailScreen;
