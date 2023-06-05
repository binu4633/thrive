import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from '@moeindana/google-oauth'
import { BrowserRouter } from 'react-router-dom';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';


const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="680514359613-jonuqb8ckg4gehk957fo2ampkjb6b4pn.apps.googleusercontent.com">
         {/* <GoogleOAuthProvider clientId="680514359613-1d1aub80vee0g8q3pk1a8mo3m4t5epsa.apps.googleusercontent.com"> */}
        <QueryClientProvider client={queryClient}>
           <App />
        </QueryClientProvider>
     </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//google auth cllent id
// 680514359613-jonuqb8ckg4gehk957fo2ampkjb6b4pn.apps.googleusercontent.com
// client secret
// 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
