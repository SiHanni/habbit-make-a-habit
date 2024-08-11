import Config from 'react-native-config';
import axios from 'axios';
import {GenerateHabit} from './paramsType';

const API_BASE_URL = Config.API_BASE_URL;

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

export const getAllHabitInfo = async (userId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users-habits/getAllHabitInfo`,
      {
        params: {userId},
      },
    );
    console.log('QWEQWEQWEQWE:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching habit info:', error);
    throw error;
  }
};

export const getHabitInfo = async (userId: number, habitId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users-habits/getHabitInfo`,
      {
        params: {userId, habitId},
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get habit info', error);
    throw error;
  }
};

export const generateHabit = async (generateHabitParams: GenerateHabit) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users-habits/generateHabit`,
      generateHabitParams,
    );
    console.log(':rerere', response);
    return response.data;
  } catch (error) {
    console.error('Failed to create habit', error);
    throw error;
  }
};

export const startHabit = async (userId: number, habitId: number) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users-habits/startHabit`,
      {habitId, userId},
    );
    return response.data;
  } catch (error) {
    console.error('Failed to start habit:', error);
    throw error;
  }
};

// Stop a habit
export const stopHabit = async (
  userId: number,
  habitId: number,
  dailyGoalId: number,
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users-habits/stopHabit`,
      {userId, habitId, dailyGoalId},
    );
    return response.data;
  } catch (error) {
    console.error('Failed to stop habit:', error);
    throw error;
  }
};

export const deleteHabit = async (userId: number, habitId: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/users-habits/removeHabit`, {
      data: {userId, habitId},
    });
  } catch (error) {
    console.error('Failed to delete habit:', error);
    throw error;
  }
};
