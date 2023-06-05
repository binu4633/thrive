import React,{useContext} from 'react';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import ContextStore from '../store/context-store';
import {useNavigate} from 'react-router-dom'
import uuid from 'react-uuid';
import axios from "axios";
import classes from './workersScheduleDates.module.css';
import Loader from '../components/loader/Loader';
function WorkerScheduleDate() {
    const storeCtx = useContext(ContextStore);
    const userInfo = storeCtx.userInfo ;
    const navigate = useNavigate()
    const { isLoading, error, data }  = useQuery({
        queryKey: ['myScheduleDates'],
        queryFn: async() =>{
            const response = await axios.get(`/api/v1/worker/myScheduleDates`,{
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                  
                  },
            });
          
            return response.data
        },
    })

    const toAdminWorkersSchedule = (id)=>{
        navigate(`/workerAuth/workerSchedule/${id}`)
    }
  return (
    <div className={classes.wrapper}>
         {isLoading && <Loader/>}
        {data && data.result && data.result.length >0 && data.result.map(d=>{
            return(

                <button className={classes.btn} onClick={toAdminWorkersSchedule.bind(this,d._id)} key={uuid()}>{d.dateString}</button>
            )
        })}
        {data && data.result && data.result.length === 0 &&
        <div className={classes.no__attendence}><p>no attendence found</p></div>
         }
    </div>
  )
}

export default WorkerScheduleDate
