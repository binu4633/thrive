import React from 'react';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import axios from "axios";
import uuid from 'react-uuid';
import classes from './manageWorker.module.css';
import Loader from '../components/loader/Loader';





function ManageWorker() {
    const { isLoading, error, data }  = useQuery({
        queryKey: ['workerData-admin'],
        queryFn: async() =>{
            const response = await axios.get('/api/v1/worker/getWorkers');
           
            return response.data
        },
    })

    

    const activateWorker = useMutation({
        mutationFn:(id)=>{
           
             


             return axios.patch('/api/v1/worker/activateWorker',{id});
        },
    })
    const blockWorker = useMutation({
        mutationFn:(id)=>{
           
             
      

             return axios.patch('/api/v1/worker/blockWorker',{id});
        },
    })
    // const deleteWorker = useMutation({
    //     mutationFn:(id)=>{
           
             


    //          return axios.delete('/api/v1/worker/deleteWorker',{id});
    //     },
    // })

  return (
    <div className={classes.wrapper}>
     
       {isLoading && <Loader/>}
       {activateWorker.isLoading && <Loader/>}
       {blockWorker.isLoading && <Loader/>}

       {data && data.result && data.result.length > 0 && data.result.map(worker=>{
        return(
            <div className={classes.worker__block} key={uuid()}>
                <div className={classes.worker__image}>
                <img src={worker.image} alt="image" />
                </div>
               <p>{worker.name}</p>
               <p>{worker.email}</p>
               <p>{worker.phone}</p>
               <p>status:{worker.isWorkerActive ?'active':"blocked"}</p>

               <div className={classes.btn__group}>
                {
                    worker.isWorkerActive &&
                    <button className={classes.btn} onClick={blockWorker.mutate.bind(this,worker._id)}>block</button>

                }
                {
                    !worker.isWorkerActive &&
                    <button className={classes.btn} onClick={activateWorker.mutate.bind(this,worker._id)}>activate</button>
                }
                
                {/* <button className={classes.btn} onClick={deleteWorker.mutate.bind(this,worker._id)}>delete</button> */}
               </div>
          
          </div>
        )
       })}
    </div>
  )
}

export default ManageWorker
