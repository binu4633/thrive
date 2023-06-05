import React from 'react';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import uuid from 'react-uuid';
import classes from './bookingWorker.module.css';
import Loader from '../components/loader/Loader';

function BookingWorker() {
    const navigate = useNavigate()
    const { isLoading, error, data }  = useQuery({
        queryKey: ['userWorkerData'],
        queryFn: async() =>{
            const response = await axios.get('/api/v1/user/bookingWorker');
       
            return response.data
        },
    })

 const toGetBookingSchedule = (id)=>{
    navigate(`/bookingSchedule/${id}`)
 }   


  return (
    <div className={classes.wrapper}>
        {isLoading && <Loader/>}
       {data&& data.result && data.result.length > 0 && data.result.map(w=>{
            return(
                // <button className={classes.btn} key={uuid()} onClick={toGetBookingSchedule.bind(this,w._id)}>
                //     {w.name}
                // </button>
                <button className={classes.btn} key={uuid()} onClick={toGetBookingSchedule.bind(this,w._id)}>
                    <div className={classes.worker__block}>
                        <div className={classes.worker__image}>
                            <img src={w.image} alt="" />
                        </div>
                        <div className={classes.worker__name}><p> {w.name}</p></div>
                    </div>
                </button>
            )
        })}
        
    </div>
  )
}

export default BookingWorker
