import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {login} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../context/AuthContext';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC<{navigation: LoginScreenNavigationProp}> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setIsLoggedIn, setUserInfo} = useAuth();

  const handleLogin = async () => {
    try {
      const result = await login(email, password);
      const {userId, username, msg} = result;
      if (msg === 'Login successful') {
        await AsyncStorage.setItem('user', JSON.stringify({userId, username}));
        setUserInfo({username, userId});
        setIsLoggedIn(true);
        navigation.navigate('Main', {userId, username}); // Main으로 네비게이션 시 파라미터 전달
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
        color="#007bff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default LoginScreen;
