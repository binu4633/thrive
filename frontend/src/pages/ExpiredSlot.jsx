import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import axios from "axios";
import uuid from 'react-uuid';

import classes from './expiredSlot.module.css'
function ExpiredSlot() {
    const params = useParams();
    const id = params.id;
  

    let { isLoading, error, data } = useQuery({
        queryKey: ["expiredSlot2"],
        queryFn: async () => {
          const response = await axios.get(`/api/v1/admin/getWorkerSchedule/${id}`);
       
        // if(response.data.slots){
       
        //     // storeCtx.getSlots(response.data.slots)
        //     setSlotState(response.data)
        // }
      
          return response.data;
        },
        onSuccess:(data)=>{
           
        }
        
      });

     
  return (
    <div className={classes.wrapper}>
        {data && data.result && 
           <div className={classes.head__block}>
                <p>{data.result.dateString}</p>
                <p>{data.result.worker}</p>
           </div>
        }
       
        <div className={classes.slots}>
      {data && data.result && data.result.slots && data.result.slots.map(sl=>{
            return (
                <div className={classes.slot} key={uuid()}>
                <p className={classes.time}>{sl.time}</p>
                <p className={classes.book}>{sl.engaged ? "booked" :'free'}</p>
                
                   {/* <button className={classes.btn__book} onClick={onBookingHandler.mutate.bind(this,sl.name)}>
                    <div>
                       <p> book </p> 
                    </div>
                   </button> */}
               
               </div>
            )
         })}
      </div>

    </div>
  )
}

export default ExpiredSlot
