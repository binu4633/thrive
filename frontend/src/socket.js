import { io } from 'socket.io-client';

// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';
// const URL =  'http://localhost:5000';
// const URL =  'https://thrive-1bmi.onrender.com';
const URL =   process.env.NODE_ENV === "production"
              ? process.env.REACT_APP_PRODUCTION_UR
              : process.env.REACT_APP_DEVELOPMENT_URL;

console.log('the url', URL)


export const socket = io(URL,{withCredentials: true});