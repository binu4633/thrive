import React,{useContext,useState} from 'react'
import classes from './workerAttendence.module.css';
import ContextStore from '../store/context-store';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import axios from "axios";
import Loader from '../components/loader/Loader';
function WorkerAttendence() {
    const storeCtx = useContext(ContextStore);
    const [enteredDate,setEnteredDate] = useState();
    const [submitError,setSubmitError] = useState(false)
    
    const userInfo = storeCtx.userInfo ;

  

    const dateChangeHandler = (e)=>{
        setEnteredDate(e.target.value);
       
    }
 

    const addWorkerAttendence = useMutation({
      
        mutationFn: () => {
          
        if(!enteredDate ){
            setSubmitError(true)
            return
         }
         setSubmitError(false)

      
         const input = {
           date:enteredDate
         }

         return  axios.post('/api/v1/worker/createWorkerAttendence',input,{
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
              
              },
         });
         
        },
        onSuccess: (data,variables,context)=>{
       
      
        }
      })

  return (
    <div className={classes.wrapper}>

        {userInfo &&
        <div className={classes.user}>
            <div className={classes.user__img}>
                <img src={userInfo.image} alt="" />
            </div>
            <p>{userInfo.name}</p>
            <p>{userInfo.email}</p>
        </div>
        }

        <div className={classes.attendence}>
            <div className={classes.date__block} >
                <p>select a date</p>
                <input type="date" name="" id="" onChange={dateChangeHandler} className={classes.input}/>
            </div>
            <div>
                <button className={classes.btn} onClick={addWorkerAttendence.mutate}>add attendence</button>
            </div>
            {submitError &&
            
            <p className={classes.error}>must select a date/ date invalid</p>
            }
        </div>
        {addWorkerAttendence.isLoading && <Loader/>}
        {addWorkerAttendence.data && <p className={classes.result}>{addWorkerAttendence.data.data.result}</p>}
        {addWorkerAttendence.isError && <p className={classes.result}>something went wrong please try again</p>}
    </div>
  )
}

export default WorkerAttendence
