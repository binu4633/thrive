import React,{useState,useContext} from 'react'
import {useParams} from 'react-router-dom';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import axios from "axios";
import classes from './adminAttendence.module.css';
import Loader from '../components/loader/Loader';
import ContextStore from '../store/context-store';
function AdminAttendence() {
    const params = useParams();
    const id = params.id;
    const storeCtx = useContext(ContextStore);
    const userInfo = storeCtx.userInfo ;
    const [enteredDate,setEnteredDate] = useState();
    const [inputError,setInputError] = useState(false);


    const { isLoading, error, data }  = useQuery({
        queryKey: ['workerData'],
        queryFn: async() =>{
            const response = await axios.get(`/api/v1/worker/getWorker/${id}`);
          
            return response.data
        },
    })

    const addAttendence = useMutation({
      
        mutationFn: (id) => {
       
       

         if(!enteredDate || !id){
            setInputError(true)
            return
         }
         setInputError(false)

      
         const input = {
            id,
            date:enteredDate
         }

         return  axios.post('/api/v1/worker/createAttendence',input,{
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
              
              },
         });
         
        },
        onSuccess: (data,variables,context)=>{

     
        //    queryClient.invalidateQueries(['repoData']);
        }
      })

    
    const dateChangeHandler = (e)=>{
     setEnteredDate(e.target.value);
    
    }

   
    
  return (
    <div className={classes.wrapper}>
         {isLoading && <Loader/>}
         {addAttendence.isLoading && <Loader/>}
        {data && data.worker &&
        
        <div className={classes.worker__block}>
            <div className={classes.worker__image}>
                <img src={data.worker.image} alt="" />
            </div>
            <div className={classes.worker__name}>
                <p>{data.worker.name}</p>
            </div>
            <div className={classes.date__block}>
                <p>select a date</p>
                <input type="date" name="" id="" onChange={dateChangeHandler} className={classes.input}/>
            </div>
             <button className={classes.btn} onClick={addAttendence.mutate.bind(this,data.worker._id)}>add attendence</button>
             {inputError && <p className={classes.er__p}>select a date to add attendence</p>}
        </div>
        }

        {addAttendence.isLoading && <p className={classes.result}>loading...</p>}
        {addAttendence.data && <p className={classes.result}>{addAttendence.data.data.result}</p>}
        {addAttendence.isError && <p className={classes.result}>something went wrong please try again</p>}
     
    </div>
  )
}

export default AdminAttendence
