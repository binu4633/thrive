import React,{useContext,useState} from 'react';
import ContextStore from '../../store/context-store';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import uuid from 'react-uuid';
import axios from "axios";

import classes from './exp2.module.css'
function Exp() {
    const storeCtx = useContext(ContextStore);
    const userInfo = storeCtx.userInfo ;
    const [isToken,setIsToken] = useState(()=>{
        if(userInfo && userInfo.token){
            return true
        }else{
            return false
        }
    })
  

    const { isLoading, error, data }  = useQuery({
        queryKey: ['workerData'],
        queryFn: async() =>{
            // if(!userInfo){
            //     return
            // }
            // if(!userInfo.token){
            //     return
            // }
            const response = await axios.get(`/api/v1/user/expiryCheck`,{
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                  
                  },
            });
           
            return response.data
        },
        enabled: isToken,
         
        // },
        onSuccess:(data)=>{
       
        if(data.error && data.error ==='jwt expired'){
               
               storeCtx.logout()
        }
        }
    })

  return (
    <div>
      {/* <div className={classes.wrapper}>
        <p>login expired please login again</p>
      </div> */}
    </div>
  )
}

export default Exp
