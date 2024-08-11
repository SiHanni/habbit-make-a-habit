import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../context/AuthContext'; // 경로 수정

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const {setIsLoggedIn, setUserInfo} = useAuth();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setIsLoggedIn(false);
      setUserInfo(null);
      navigation.navigate('Login'); // 로그인 화면으로 네비게이션
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const goToUserSettings = () => {
    navigation.navigate('UserSettings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={styles.menuItemText}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={goToUserSettings}>
          <Text style={styles.menuItemText}>User Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItemText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
