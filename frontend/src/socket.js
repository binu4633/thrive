import { io } from 'socket.io-client';

// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';
// const URL =  'http://localhost:5000';
const URL =  'https://thrive-1bmi.onrender.com';




export const socket = io(URL,{withCredentials: true});