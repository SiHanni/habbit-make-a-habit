// src/App.tsx
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import {RootStackParamList} from './src/navigation/RootStackParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator<RootStackParamList>();

export const checkLoginStatus = async (
  setIsLoggedIn: (value: boolean | null) => void,
  setUsername: (value: string | null) => void,
) => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    setUsername(parsedUser.username);
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    checkLoginStatus(setIsLoggedIn, setUsername);
  }, []);

  if (isLoggedIn === null) {
    // 로딩 상태, 로딩 스피너 등을 표시할 수 있습니다.
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" options={{headerShown: false}}>
              {props => (
                <LoginScreen
                  {...props}
                  setIsLoggedIn={setIsLoggedIn}
                  setUsername={setUsername}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <Stack.Screen name="Main" options={{headerShown: false}}>
            {() => (
              <BottomTabNavigator
                username={username}
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
