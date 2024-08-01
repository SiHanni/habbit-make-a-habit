// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.104:3000', // 백엔드 API의 기본 URL
});

export const getHabitInfo = async (userId: number): Promise<any> => {
  try {
    const response = await api.get('/users-habits/getAllHabitInfo', {
      params: {userId}, // 쿼리 파라미터로 userId 전송
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching habit info:', error);
    throw error;
  }
};
