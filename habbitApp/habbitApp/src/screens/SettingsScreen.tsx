// src/screens/SettingsScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkLoginStatus} from '../../App'; // 경로 유지

type Props = {
  setIsLoggedIn: (value: boolean | null) => void;
  setUsername: (value: string | null) => void;
};

const SettingsScreen: React.FC<Props> = ({setIsLoggedIn, setUsername}) => {
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    checkLoginStatus(setIsLoggedIn, setUsername);
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
