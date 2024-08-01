import Config from 'react-native-config';
import axios from 'axios';

const API_BASE_URL = Config.API_BASE_URL;

export const getHabitInfo = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users-habits/getAllHabitInfo`,
      {
        params: {userId}, // 쿼리 파라미터로 userId 전송
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching habit info:', error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/logIn`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Failed to login', error.response.data.message);
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      console.error('Failed to login', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const signUp = async (createUserDto: {
  email: string;
  username: string;
  password: string;
  interests?: string[];
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/signUp`,
      createUserDto,
    );
    return response.data;
  } catch (error) {
    console.error('Failed to sign up', error);
    throw error;
  }
};
