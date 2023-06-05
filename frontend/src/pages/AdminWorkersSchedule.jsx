import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import axios from "axios";
import classes from './adminWorkersSchedule.module.css';
import Loader from '../components/loader/Loader';
function AdminWorkersSchedule() {
    const params = useParams();
    const id = params.id;
  
    const { isLoading, error, data }  = useQuery({
        queryKey: ['workerScheduleData'],
        queryFn: async() =>{
            const response = await axios.get(`/api/v1/admin/getWorkerSchedule/${id}`);
           
            return response.data
        },
    })
  return (
    <div className={classes.wrapper}>
        {isLoading && <Loader/>}
        <div className={classes.slots}>

         {data && data.result && data.result.slots && data.result.slots.map(sl=>{
            return (
                <div className={classes.slot}>
                <p className={classes.time}>{sl.time}</p>
                <p className={classes.book}>{sl.engaged ? "booked" :'free'}</p>
            </div>
            )
         })}

           
           
        </div>
    </div>
  )
}

export default AdminWorkersSchedule
