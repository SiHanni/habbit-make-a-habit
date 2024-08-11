// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PomodoroScreen from '../screens/BottomTabBar/Pomodoro';
import HabitScreen from '../screens/BottomTabBar/GenerateHabit';
import PointsScreen from '../screens/BottomTabBar/Point';
import MainScreen from '../screens/MainScreen';

const Tab = createBottomTabNavigator();

// `BottomTabNavigatorProps` 정의
interface BottomTabNavigatorProps {
  userId: number;
  username: string;
}

const getTabBarIcon = (iconName: string) => {
  return ({color, size}: {color: string; size: number}) => (
    <FontAwesome name={iconName} size={size} color={color} />
  );
};

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  userId,
  username,
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
        children={() => <MainScreen userId={userId} username={username} />}
        options={{
          tabBarIcon: getTabBarIcon('home'),
        }}
      />
      <Tab.Screen
        name="Habit"
        component={HabitScreen}
        options={({route}) => ({
          tabBarIcon: getTabBarIcon('plus-circle'),
          tabBarStyle: route.name === 'Habit' ? {display: 'none'} : undefined,
        })}
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
