// src/screens/Auth/RegisterScreen.tsx
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList'; // 수정된 경로
import {signUp} from '../../services/api';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

// 이메일 형식 검증을 위한 정규 표현식
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [interests, setInterests] = useState<string>(''); // Optional interests field

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address');
      return;
    }

    if (password.length < 4) {
      Alert.alert(
        'Weak password',
        'Password must be at least 4 characters long',
      );
      return;
    }
    try {
      const newUser = await signUp({
        email,
        username,
        password,
        interests: interests.split(','),
      });
      console.log('new user', newUser);
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Sign Up failed', 'An error occurred during sign up');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoComplete="email" // 수정된 부분
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Interests (comma separated)"
        value={interests}
        onChangeText={setInterests}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate('Login')}
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
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RegisterScreen;
