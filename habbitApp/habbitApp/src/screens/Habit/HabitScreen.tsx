import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {generateHabit} from '../../services/api';
import {GenerateHabit} from '../../services/paramsType';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HabitScreen: React.FC = () => {
  const [mainGoal, setMainGoal] = useState('');
  const [goalDays, setGoalDays] = useState('');
  const [dailyGoal, setDailyGoal] = useState('');
  const [dailyGoalTime, setDailyGoalTime] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserId(parsedUser.userId); // 여기에서 userId를 직접 사용
      }
    };

    fetchUserData();
  }, []);
  const handleSubmit = async () => {
    if (userId === null) {
      Alert.alert('Error', 'User not found');
      return;
    }

    const habitData: GenerateHabit = {
      userId,
      mainGoal,
      goalDays: parseInt(goalDays, 10),
      dailyGoal,
      dailyGoalTime: parseInt(dailyGoalTime, 10),
    };

    try {
      const result = await generateHabit(habitData);
      console.log('HABIT RESULT:', result);
      Alert.alert('Success', '습관이 성공적으로 생성되었습니다!');
    } catch (error) {
      Alert.alert('Error', '습관 생성에 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Main Goal:</Text>
      <TextInput
        style={styles.input}
        value={mainGoal}
        onChangeText={setMainGoal}
      />
      <Text style={styles.label}>Goal Days:</Text>
      <TextInput
        style={styles.input}
        value={goalDays}
        onChangeText={setGoalDays}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Daily Goal:</Text>
      <TextInput
        style={styles.input}
        value={dailyGoal}
        onChangeText={setDailyGoal}
      />
      <Text style={styles.label}>Daily Goal Time (in minutes):</Text>
      <TextInput
        style={styles.input}
        value={dailyGoalTime}
        onChangeText={setDailyGoalTime}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
  },
});

export default HabitScreen;
