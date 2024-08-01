import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import {RootStackParamList} from './RootStackParamList';

const AuthStack = createStackNavigator<RootStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Main"
        component={MainScreen}
        options={{headerShown: false}} // 네비게이션 바 숨기기
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
