import axios from 'axios';
import {LoginUserType} from '../types/authTypes';

export const loginAuth = async ({email, password}: LoginUserType) => {
  if (!email || !password) {
    console.error('Eksik parametre girişi yapıldı!');
  }
  const data = {
    email,
    password,
  };

  try {
    const response = await axios.post(
      'http://176.116.6.253:3000/user/login',
      data,
    );
    return response.data;
  } catch (error: any) {
    const errors = error.response;
    return console.log(errors);
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get('http://176.116.6.253:3000/user/login');
    return response.data;
  } catch (error: any) {
    const errors = error.response;
    return console.log(errors);
  }
};
