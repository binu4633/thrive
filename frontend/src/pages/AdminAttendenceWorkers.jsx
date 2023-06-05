import React ,{useContext} from 'react'
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import uuid from 'react-uuid';
import classes from './adminAttendenceWorkers.module.css';
import Loader from '../components/loader/Loader';
import ContextStore from '../store/context-store';
function AdminAttendenceWorkers() {
    const navigate = useNavigate();
    const storeCtx = useContext(ContextStore);
    const userInfo = storeCtx.userInfo ;

    const { isLoading, error, data }  = useQuery({
        queryKey: ['workerData'],
        queryFn: async() =>{
            const response = await axios.get('/api/v1/admin/getWorkers',{
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                  
                  },
            });
           
            return response.data
        },
    })

  const toAttendenceHandler = (id)=>{
     navigate(`/admin/adminAttendence/${id}`)
  }  

  return (
    <div className={classes.wrapper}>
        {isLoading && <Loader/>}
        <div className={classes.worker__block}>

       
        {data&& data.result && data.result.length > 0 && data.result.map(w=>{
            return(
                <button className={classes.btn} key={uuid()} onClick={toAttendenceHandler.bind(this,w._id)}>
                    {w.name}
                </button>
            )
        })}
     
         </div>
      
    </div>
  )
}

export default AdminAttendenceWorkers
