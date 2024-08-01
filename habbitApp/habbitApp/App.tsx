import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import MainScreen from './src/screens/MainScreen';
import {RootStackParamList} from './src/navigation/RootStackParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Main'>('Login');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setInitialRoute('Main');
      } else {
        setInitialRoute('Login');
      }
    };
    checkLoginStatus();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
