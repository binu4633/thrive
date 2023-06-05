import React,{useContext,useState} from 'react';
import ContextStore from '../../store/context-store';
import moment from 'moment';
import uuid from 'react-uuid';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import axios from "axios";
import classes from './page.module.css';
import { daysInEnglish } from '../../utils/daysInEnglish';
import {daysInMalayalam} from '../../utils/daysInMalayalam';
import {socket} from '../../socket.js'
 
function PageTwo({slot}) {
    const storeCtx = useContext(ContextStore);
    const userInfo = storeCtx.userInfo ;
    const isEmpty = slot.length === 0;
    const toDay = new Date(Date.now()+ 24*60*60*1000).getDay() ;
    const toDayDate =moment(new Date(Date.now()+ 24*60*60*1000)).format('DD-MM-YYYY') ;

    const [slotState, setSlotState] = useState(slot ? slot[0] : null);

    const [opError,setOpError] = useState(false);

    const onBookingHandler = useMutation({
        mutationFn: (name) => {
            if(!name || !slot[0]._id)  {
               
                return
            }
            const bookDetail = {
                slotName:name,
                scheduleId:slot[0]._id
            }
            return axios.post('/api/v1/user/book',bookDetail,{
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                  
                  },
            })
        },
        onSuccess:(data)=>{
     
          if(data.data.status ==='failed'){
            setOpError(true)
          }
        }
      })


      socket.on("updateSlot", (updatedSlot) => {
       
        if (slotState && slotState.slots && updatedSlot) {
           if(slotState._id === updatedSlot._id){
            setSlotState(updatedSlot)
           }
        }
       
      });   

  return (
    <div className={classes.wrapper}>
      <div className={classes.date__bar}>
        <div>
            <p className={classes.days}>{toDayDate}</p>
        </div>
        <div>
            <span className={classes.days}>{daysInEnglish[toDay]}/</span>
            <span className={classes.days}>{daysInMalayalam[toDay]}</span>
        </div>
      </div>
      {
        opError &&
         <div className={classes.opError}>
          <p>something went wrong please try later</p>
         </div>
      }
      <div className={classes.slots}>
      {/* {slot && !isEmpty && slot[0].slots.map(sl=>{ */}
      {slotState && slotState.slots.map(sl=>{
            return (
                <div className={classes.slot} key={uuid()}>
                <p className={classes.time}>{sl.time}</p>

                {!userInfo || !userInfo.isMember &&
                
                <p className={classes.book}>{sl.engaged ? "booked" :'free'}</p>
                }
                {userInfo && userInfo.isMember && sl.customerEmailId !== userInfo.email &&

                   <p className={classes.book}>{sl.engaged ? "booked" :''}</p>
                }
                {userInfo && userInfo.isMember && sl.customerEmailId === userInfo.email &&

                   <p className={classes.book}>{sl.engaged ? "your booked time" :''}</p>
                }
               

                {userInfo && userInfo.isMember && !sl.engaged &&
                   
                   <button className={classes.btn__book} onClick={onBookingHandler.mutate.bind(this,sl.name)}>
                    
                    <div>
                       <p> book </p> 
                    </div>
                   </button>
                }



                </div>
            )
         })}
      </div>
      {toDay === 0 &&
        <div className={classes.holiday}>
           <p>sunday shop closed</p>
        </div>
      }
       {isEmpty && toDay !== 0 &&
         <div className={classes.empty}>
         <p> cannot fetch data or slot not allocated </p>
        </div>
       }
      
     
    </div>
  )
}

export default PageTwo
