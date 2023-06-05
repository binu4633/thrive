import React,{useContext,useState} from 'react';
import ContextStore from '../../store/context-store';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import GLogin from './GLogin';
import FLogin from './FLogin';

import classes from './loginArea.module.css';
function LoginArea() {
    const storeCtx = useContext(ContextStore);

   

    const [isToRequest, setIsToRequest] = useState(false);
    const [inputNumber,setInputNumber] = useState();
    const [phoneNumberError,setPhoneNumberError] = useState(false);
    const userInfo = storeCtx.userInfo;
const logoutHandler  = ()=>{
//    localStorage.removeItem('userInfo')
     storeCtx.logout()
} 

 const clip1 ={
    clipPath: 'circle(0% at 100% 0)',
    transition:"all .3s ease-in"
 }   
 const clip2 ={
    clipPath: 'circle(150% at 100% 0)',
    transition:"all .3s ease-out"
}  

const memberRequestDisplayHandler = ()=>{
   setIsToRequest(!isToRequest)
}

const phoneInputHandler = (e)=>{
    setInputNumber(e.target.value);
}




const memberRequestMutation = useMutation({
    mutationFn:(e)=>{
       e.preventDefault();
         if(!inputNumber || inputNumber.length !== 10){
            setPhoneNumberError(true);
            return
         }
         setPhoneNumberError(false);

       if(!userInfo){
        return
       }

       const phone = {
        phone:inputNumber
       }

       return  axios.post('/api/v1/user/addMemberRequset',phone,{
        headers: {
            Accept: "application/json",
            // Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            Authorization: `Bearer ${userInfo.token}`,
          
          },
       });
         
    },
    onSuccess:(data)=>{
       
        setIsToRequest(false);

        if(data.data.userInfo){
        
          storeCtx.login(data.data.userInfo)
        }
    }
})

if(memberRequestMutation.data){
    
}

  return (
    <div className={classes.wrapper} style={storeCtx.isLoginAreaOpen ?clip2 : clip1}>
      <div className={classes.login__wrapper}>
        <div>
        {storeCtx.userInfo &&
        <button className={classes.btn__logout} onClick={logoutHandler}>logout</button>
        }
        </div>
       <div className={classes.login__block}>
       {!storeCtx.userInfo &&
        
        <GLogin />
        }
       </div>
       {/* <div  className={classes.login__block}>
       {!storeCtx.userInfo &&
        
        <FLogin />
        }
       </div> */}
       {userInfo && userInfo.isMember === false &&
       
       <div>
       <button className={classes.btn__rqline} onClick={memberRequestDisplayHandler}>want to become a member</button>
       </div>
       }
      {
        isToRequest && userInfo && userInfo.isMember === false &&
        <div>
        <form className={classes.member__form} onSubmit={memberRequestMutation.mutate}>
        
                <p>add your phone number</p>
                <input type="number"  onChange={phoneInputHandler} value={inputNumber}/><br/>
                {phoneNumberError &&
                
                <p>phonenumber must have 10 digit</p>
                }
                <button>submit</button>
            
        </form>
       </div>
      }
      {memberRequestMutation.isSuccess
      && memberRequestMutation.data 
      && memberRequestMutation.data.data.status === 'success' &&
      <p className={classes.result}>request send successfully</p>
      }
       
      {memberRequestMutation.isSuccess
      && memberRequestMutation.data 
      && memberRequestMutation.data.data.status === 'failed' &&
      <p className={classes.result}>request send failed to perform</p>
      }
       
      </div>
    </div>
  )
}

export default LoginArea
