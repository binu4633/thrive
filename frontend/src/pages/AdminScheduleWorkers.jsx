import React from 'react';
import {useNavigate} from 'react-router-dom'
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import uuid from 'react-uuid';
import axios from "axios";
import classes from './adminScheduleWorkers.module.css';
import Loader from '../components/loader/Loader';

function AdminScheduleWorkers() {
    const navigate = useNavigate()
    const { isLoading, error, data }  = useQuery({
        queryKey: ['workerData'],
        queryFn: async() =>{
            const response = await axios.get(`/api/v1/worker/getWorkers`);
          
            return response.data
        },
    })

    const toWorkersScheduleDateHandler = (id)=>{
        navigate(`/admin/adminWorkersScheduleDates/${id}`)
     }  
  return (
    <div className={classes.wrapper}>
        {isLoading && <Loader/>}
        {data && data.result && data.result.map(d=>{
            return(
                <button className={classes.btn} onClick={toWorkersScheduleDateHandler.bind(this,d._id)} key={uuid()}>{d.name}</button>

            )
        })}
    </div>
  )
}

export default AdminScheduleWorkers
