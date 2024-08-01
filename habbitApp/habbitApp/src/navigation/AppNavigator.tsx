import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{headerShown: false}} // AuthNavigator 내부에서 네비게이션 바를 숨깁니다
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
