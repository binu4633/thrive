import React,{useState} from 'react';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import uuid from 'react-uuid';
import Loader from '../components/loader/Loader';

import classes from './deleteSlot.module.css';
function DeleteSlot() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [slotData,setSlotData] = useState();
    const [pageCount,setPageCount] = useState(0);
    const [pageNumCount,setPageNumCount] = useState(0);
    const [page,setPage] = useState(1)
    const pageArray = [];

    for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
   let pageBtnWidth = 4;
    // const { isLoading, error, data }  = useQuery({

    // const expireDateMutation = useMutation({
    //     mutationFn:()=>{
    //         axios.post('/api/v1/admin/getExpiredDates',{});
    //     },
    //     onSuccess:(data)=>{
   
    //     if(data.result){
    //         setSlotData(data.result)
    //     }
    //     }

    // })

   

    const expireDateQuery = useQuery({  
        queryKey: ['workerData',page],
        queryFn: async() =>{
            
            const response = await axios.get(`/api/v1/admin/getExpiredDates?page=${page}`);
     
            return response.data
        },
        onSuccess:(data)=>{
      
     
        if(data.result){
            setSlotData(data.result)
        }
        if(data.pageTotal){
            setPageCount(data.pageTotal)
        }
        }
    })

  




    const paginationHandler = (p)=>{
       setPage(p)
    }
    
    const pageRightHandler = ()=>{

       

        if(pageNumCount === 0){
            return
        }

        setPageNumCount(prev=>prev+1)
    }
    const pageLeftHandler = ()=>{
     
        if(pageNumCount === 5-pageCount){
            return
        }
        setPageNumCount(prev=>prev-1)
    }

    const toShowHandler = (id)=>{
       navigate(`/admin/expiredSlot/${id}`)
    }

    const slotDeleteMutation = useMutation({
        mutationFn:async(id)=>{
        
         const response = await axios.delete(`/api/v1/admin/deleteSlot/${id}`,);
    
         return response.data
        },
        onSuccess: ()=>{
          
            queryClient.invalidateQueries(['workerData'])
            // if(data.id){
            //     const filteredData = slotData.filter(sl=> sl._id !== data.id);
            //     setSlotData(filteredData)
            // }
        }
     })
    
  return (
    <div className={classes.wrapper}>
             {expireDateQuery.isLoading && <Loader/>}
             {slotDeleteMutation.isLoading && <Loader/>}

        <div className={classes.data__wrapper}>
            {slotData && slotData.map(sl=>{
                return(
                    <div className={classes.data__block} key={uuid()}>
                       <p>{sl.dateString}</p>
                       <p>{sl.worker}</p>
                       <button onClick={toShowHandler.bind(this,sl._id)}>show</button>
                       <button onClick={slotDeleteMutation.mutate.bind(this,sl._id)}>delete</button>
                     </div>
                )
            })}
          
        </div>

        <div className={classes.pagination}>
            {pageCount> 5 &&
              <div className={classes.arrow__div}>
               <button className={classes.btn__left} onClick={pageLeftHandler}></button>
              </div>
            }
            
            <div className={classes.page__wrapper}>
             <div style={{transform:`translateX(${pageBtnWidth*pageNumCount}rem)`}} className={classes.page__container}>
               {pageArray.map(p=>{
                return(
                    // <button className={classes.btn__page} onClick={paginationSlotMutation.mutate.bind(this,p)}>{p}</button>
                    <button className={classes.btn__page} onClick={paginationHandler.bind(this,p)} key={uuid()}>{p}</button>
                )
               })}
               
               
            </div>
            </div>
            {pageCount> 5 &&
              <div className={classes.arrow__div}>
                 <button className={classes.btn__right} onClick={pageRightHandler}></button>
              </div>
            }
            
        </div>
        
    </div>
  )
}

export default DeleteSlot
