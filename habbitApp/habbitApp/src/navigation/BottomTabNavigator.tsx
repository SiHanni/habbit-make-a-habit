// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PomodoroScreen from '../screens/BottomTabBar/Pomodoro';
import HabitScreen from '../screens/BottomTabBar/CreateHabit';
import PointsScreen from '../screens/BottomTabBar/Point';
import MainScreen from '../screens/MainScreen';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (iconName: string) => {
  return ({color, size}: {color: string; size: number}) => (
    <FontAwesome name={iconName} size={size} color={color} />
  );
};

type BottomTabNavigatorProps = {
  username: string | null;
  setIsLoggedIn: (value: boolean | null) => void;
  setUsername: (value: string | null) => void;
};

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  username,
  setIsLoggedIn,
  setUsername,
}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Pomodoro"
        component={PomodoroScreen}
        options={{
          tabBarIcon: getTabBarIcon('clock-o'),
        }}
      />
      <Tab.Screen
        name="Home"
        children={() => (
          <MainScreen
            username={username}
            setIsLoggedIn={setIsLoggedIn}
            setUsername={setUsername}
          />
        )}
        options={{
          tabBarIcon: getTabBarIcon('home'),
        }}
      />
      <Tab.Screen
        name="Habit"
        component={HabitScreen}
        options={{
          tabBarIcon: getTabBarIcon('plus-circle'),
        }}
      />
      <Tab.Screen
        name="Points"
        component={PointsScreen}
        options={{
          tabBarIcon: getTabBarIcon('star'),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
