// src/screens/MainScreen.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

type Props = {
  username: string | null;
  setIsLoggedIn: (value: boolean | null) => void;
  setUsername: (value: string | null) => void;
};

const MainScreen: React.FC<Props> = ({
  username,
  //setIsLoggedIn,
  //setUsername,
}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigation = useNavigation<any>();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
      <Text style={styles.title}>Welcome, {username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: 20,
  },
});

export default MainScreen;
