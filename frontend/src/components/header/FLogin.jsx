import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
function FLogin() {
  return (
    <div>
      <FacebookLogin
        appId="5911377678968644"
        onSuccess={(response) => {
         
        }}
        onFail={(error) => {
          
        }}
        onProfileSuccess={(response) => {
         
        }}

       

        style={{
            backgroundColor: '#4267b2',
            color: '#fff',
            fontSize: '16px',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
          }}


      />
    </div>
  );
}

export default FLogin;
