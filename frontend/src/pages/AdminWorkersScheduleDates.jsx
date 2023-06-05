import React from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import uuid from 'react-uuid';
import axios from "axios";
import classes from './adminWorkersScheduleDates.module.css';
import Loader from '../components/loader/Loader';

function AdminWorkersScheduleDates() {
    const params = useParams();
    const navigate = useNavigate()
    const id = params.id;
    const { isLoading, error, data }  = useQuery({
        queryKey: ['workerScheduleData'],
        queryFn: async() =>{
            const response = await axios.get(`/api/v1/admin/getWorkerScheduleDates/${id}`);
          
            return response.data
        },
    })

    const toAdminWorkersSchedule = (id)=>{
        navigate(`/admin/adminWorkersSchedule/${id}`)
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

export default AdminWorkersScheduleDates
