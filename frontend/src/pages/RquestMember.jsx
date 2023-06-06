import React,{useContext} from 'react';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import axios from "axios";
import classes from './rquestMember.module.css';
import Loader from '../components/loader/Loader';
import ContextStore from '../store/context-store';
import uuid from 'react-uuid';
function RquestMember() {
  const storeCtx = useContext(ContextStore);
  const userInfo = storeCtx.userInfo ;
  const queryClient = useQueryClient();
    const { isLoading, error, data }  = useQuery({
        queryKey: ['member-request-data'],
        queryFn: async() =>{
            const response = await axios.get(`/api/v1/admin/getMemberRequest`);
          
            return response.data
        },
    })

    

    const acceptMemberMutation = useMutation({
       mutationFn:(id) => {
      

        return axios.post('/api/v1/admin/acceptMemberRequest',{id},{
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          
          },
        })
       },
        onSuccess: ()=>{
          queryClient.invalidateQueries(['member-request-data'])
        }
      })
    const rejectMemberMutation = useMutation({
       mutationFn:(id) => {
        

        return axios.post('/api/v1/admin/rejectMemberRequest',{id},{
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          
          },
        })
       },
        onSuccess: ()=>{
          queryClient.invalidateQueries(['member-request-data'])
        }
      })
  return (
    <div className={classes.wrapper}>
       <div className={classes.rq__block}>
        {isLoading && <Loader/>}
        {acceptMemberMutation.isLoading && <Loader/>}
        {rejectMemberMutation.isLoading && <Loader/>}
        {!data&&
            <div className={classes.no__request}>
              <p>data cannot be fetched</p>
            </div>
        }
        {data && data.activeMemberRequest && data.activeMemberRequest.length === 0 &&
            <div className={classes.no__request}>
              <p>no active request available</p>
            </div>
        }
        
        {data && data.activeMemberRequest && data.activeMemberRequest.map(rq=>{
            return(
                <div className={classes.rq__box} key={uuid()}>
                <div className={classes.image}>
                   <img src={rq.image ? rq.image :''} alt="" />
                </div>
                <p>{rq.name}</p>
                <p>{rq.email}</p>
                <p>{rq.phone}</p>
 
                <button onClick={acceptMemberMutation.mutate.bind(this,rq._id)}>accept</button>
                <button onClick={rejectMemberMutation.mutate.bind(this,rq._id)}>reject</button>
            </div>
            )
        })}
           
       </div>
    </div>
  )
}

export default RquestMember
