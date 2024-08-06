import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  Keyboard,
} from 'react-native';
import {generateHabit} from '../../services/api';
import {GenerateHabit} from '../../services/paramsType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButtonHeader from '../../components/BackButtonHeader';
import {useNavigation} from '@react-navigation/native';

const HabitScreen: React.FC = () => {
  const [mainGoal, setMainGoal] = useState('');
  const [goalDays, setGoalDays] = useState('7'); // Default to 7 days
  const [dailyGoal, setDailyGoal] = useState('');
  const [dailyGoalTime, setDailyGoalTime] = useState('30'); // Default to 30 minutes
  const [userId, setUserId] = useState<number | null>(null);

  // Modal states
  const [isGoalDaysModalVisible, setIsGoalDaysModalVisible] = useState(false);
  const [isDailyGoalTimeModalVisible, setIsDailyGoalTimeModalVisible] =
    useState(false);

  const navigation = useNavigation<any>(); // Ensure TypeScript understands navigation type

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          console.log('Parsed user:', parsedUser); // Debug log
          if (parsedUser && parsedUser.userId) {
            setUserId(parsedUser.userId);
          } else {
            console.warn('User ID not found in parsed data');
          }
        } else {
          console.warn('User data not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
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

    console.log('QWEQWEQWE:', habitData);

    try {
      const result = await generateHabit(habitData);
      console.log('HABIT RESULT:', result);
      Alert.alert('Success', '습관이 성공적으로 생성되었습니다!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Home', {refresh: true});
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', '습관 생성에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  // Dismiss keyboard when tapping outside of the TextInput
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <BackButtonHeader />
        <Text style={styles.label}>목표</Text>
        <TextInput
          style={styles.input}
          value={mainGoal}
          onChangeText={setMainGoal}
          placeholder="이루고자 하는 목표를 생각해봐요"
          placeholderTextColor="#B0B0B0"
        />
        <Text style={styles.label}>목표 날짜</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setIsGoalDaysModalVisible(true)}>
          <Text style={styles.inputText}>{goalDays}일</Text>
        </TouchableOpacity>
        <Text style={styles.label}>루틴</Text>
        <TextInput
          style={styles.input}
          value={dailyGoal}
          onChangeText={setDailyGoal}
          placeholder="목표를 위한 데일리 루틴을 생각해봐요"
          placeholderTextColor="#B0B0B0"
        />
        <Text style={styles.label}>루틴 시간</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setIsDailyGoalTimeModalVisible(true)}>
          <Text style={styles.inputText}>{dailyGoalTime}분</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>생성</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for selecting goalDays */}
        <Modal
          transparent={true}
          visible={isGoalDaysModalVisible}
          onRequestClose={() => setIsGoalDaysModalVisible(false)}>
          <TouchableWithoutFeedback
            onPress={() => setIsGoalDaysModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalLabel}>목표 날짜를 선택하세요</Text>
                <FlatList
                  data={[...Array(25).keys()].map(i => ({value: i + 7}))}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => {
                        setGoalDays(item.value.toString());
                        setIsGoalDaysModalVisible(false);
                      }}>
                      <Text style={styles.modalButtonText}>{item.value}일</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.value.toString()}
                  style={styles.modalList}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Modal for selecting dailyGoalTime */}
        <Modal
          transparent={true}
          visible={isDailyGoalTimeModalVisible}
          onRequestClose={() => setIsDailyGoalTimeModalVisible(false)}>
          <TouchableWithoutFeedback
            onPress={() => setIsDailyGoalTimeModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalLabel}>루틴 시간을 선택하세요</Text>
                <FlatList
                  data={[...Array(16).keys()].map(i => ({value: (i + 1) * 30}))}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => {
                        setDailyGoalTime(item.value.toString());
                        setIsDailyGoalTimeModalVisible(false);
                      }}>
                      <Text style={styles.modalButtonText}>{item.value}분</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.value.toString()}
                  style={styles.modalList}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Light background color for better contrast
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    fontSize: 17,
    borderRadius: 5,
    borderColor: '#DDDDDD', // Light border color for better visibility
    backgroundColor: 'white', // White background for the input fields
    marginBottom: 15,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 17,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#FF6F61', // Example color for cancel button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50', // Example color for submit button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '60%', // Reduced width
    maxHeight: '40%', // Limit height
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  modalLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalList: {
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HabitScreen;
