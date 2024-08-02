// src/screens/MainScreen.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootStackParamList';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
};

const MainScreen: React.FC<Props> = ({navigation, route}) => {
  const {username} = route.params;
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText}>
          {currentDateTime.toLocaleDateString()}{' '}
          {currentDateTime.toLocaleTimeString()}
        </Text>
      </View>
      <Text style={styles.title}>Welcome, {username}</Text>
      <Button title="Log out" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTimeContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
  },
  dateTimeText: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default MainScreen;
