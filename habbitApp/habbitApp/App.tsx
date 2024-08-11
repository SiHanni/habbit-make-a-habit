// src/App.tsx
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import SettingsScreen from './src/screens/SettingsScreen';
import UserSettingsScreen from './src/screens/UserSettingsScreen';
import HabitDetailScreen from './src/screens/Habit/HabitDetailScreen';
import {RootStackParamList} from './src/navigation/RootStackParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TimerProvider} from './src/context/TimerContext';
import {AuthProvider, useAuth} from './src/context/AuthContext';

const Stack = createStackNavigator<RootStackParamList>();

const AppContent: React.FC = () => {
  const {setIsLoggedIn, setUserInfo, isLoggedIn, userInfo} = useAuth();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserInfo({userId: parsedUser.userId, username: parsedUser.username});
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [setIsLoggedIn, setUserInfo]);

  if (isLoggedIn === null) {
    return null; // 로딩 상태, 로딩 스피너 등을 표시할 수 있습니다.
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" options={{headerShown: false}}>
              {props => <LoginScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" options={{headerShown: false}}>
              {props => (
                <BottomTabNavigator
                  userId={userInfo?.userId ?? 0}
                  username={userInfo?.username ?? 'Guest'}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="UserSettings" component={UserSettingsScreen} />
            <Stack.Screen name="HabitDetail" component={HabitDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TimerProvider>
        <AppContent />
      </TimerProvider>
    </AuthProvider>
  );
};

export default App;
