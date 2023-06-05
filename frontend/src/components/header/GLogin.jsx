import React,{useContext} from 'react'
import {GoogleLogin} from '@moeindana/google-oauth';
import axios from 'axios';
import ContextStore from '../../store/context-store';
function GLogin() {
    const storeCtx = useContext(ContextStore)
    const onSucess = async (response) => {
       
        const token = response.credential;
   
        // dispatch(googleAuth(token))
        const serverResponse = await axios.post("/api/v1/user/googleAuth", {
          token,
        });
      
        if(serverResponse.data.userInfo){
            // localStorage.setItem('userInfo',JSON.stringify(serverResponse.data.userInfo));
            storeCtx.login(serverResponse.data.userInfo)
        }

      };
  return (
    <>
           <GoogleLogin
      
      onSuccess={onSucess}
      onError={(e) => {
        console.log("Login Failed",e);
      }}
      // redirect_uri='http://127.0.0.1:3000'
      redirect_uri={window.location.origin}
      SECURE_REFERRER_POLICY = "no-referrer-when-downgrade"
    />
    </>
  )
}

export default GLogin
