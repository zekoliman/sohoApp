import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const customAxios = axios.create({
  baseURL: 'http://176.116.6.253:3000/',
  timeout: 300000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setHeadersBearerCustomAxios = async (token: string) => {
  customAxios.defaults.headers.post.Authorization = `${token}`;
  customAxios.defaults.headers.get.Authorization = `${token}`;
  customAxios.defaults.headers.put.Authorization = `${token}`;
  customAxios.defaults.headers.delete.Authorization = `${token}`;
  customAxios.defaults.headers.patch.Authorization = `${token}`;
};

const errorHandler = async (error: any) => {
  if (error?.response?.status === 401) {
    if (await AsyncStorage.getItem('user_session')) {
      await AsyncStorage.removeItem('user_session');
    }
  }

  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  request => request,
  error => error,
);

customAxios.interceptors.response.use(
  response => response,
  error => errorHandler(error),
);

export default customAxios;
