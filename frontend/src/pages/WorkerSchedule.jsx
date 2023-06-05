import React, { useContext ,useState} from "react";
import { useParams } from "react-router-dom";
import ContextStore from "../store/context-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import uuid from "react-uuid";
import Loader from "../components/loader/Loader";
import { socket } from "../socket.js";
import phone from '../images/phone.svg'
import classes from "./workersSchedule.module.css";
function WorkerSchedule() {
  const params = useParams();
  const id = params.id;
  const storeCtx = useContext(ContextStore);
  const userInfo = storeCtx.userInfo;
 
  const [slotState,setSlotState] = useState(null);
  const { isLoading, error, data } = useQuery({
    queryKey: ["myScheduleData"],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/worker/mySchedule/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
   
      return response.data;
    },
    onSuccess:(data)=>{
      
        if(data.result){
            setSlotState(data.result)
        }
     }
  });

  const onBookingHandler = useMutation({
    mutationFn: (name) => {
      // if(!name || !slot[0]._id)  {
   
      //     return
      // }

      const bookDetail = {
        slotName: name,
        scheduleId: data.result._id,
      };
     
      return axios.post("/api/v1/worker/workerBook", bookDetail, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
    },
   
  });
  const undoBookingHandler = useMutation({
    mutationFn: (name) => {
      // if(!name || !slot[0]._id)  {
    
      //     return
      // }

      const bookDetail = {
        slotName: name,
        scheduleId: data.result._id,
      };
   
      return axios.post("/api/v1/worker/undoBooking", bookDetail, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
    },
   
  });

//   let slotData = data ? (data.result ? data.result : null) : null;

  

  socket.on("updateSlot", (updatedSlot) => {
  
  

    // if(updatedSlot._id === slot[0]._id){
    //     slot[0] = updatedSlot
    // }
    if (slotState && slotState.slots && updatedSlot) {
       if(slotState._id === updatedSlot._id){
        setSlotState(updatedSlot)
       }
    }
    // if (slotData && slotData.slots) {
    //   slotData.slots.map((sl) => {
    //     if (sl.length > 0) {
    //       if (sl[0]._id === updatedSlot._id) {
    //         sl[0] = updatedSlot;
    //       }
    //     }
    //     return sl;
    //   });
    // }
    // setSlotState(slotData);
  });
  socket.on("undoUpdateSlot", (updatedSlot) => {
 
  
    if (slotState && slotState.slots && updatedSlot) {
       if(slotState._id === updatedSlot._id){
        setSlotState(updatedSlot)
       }
    }
    // if (slotData && slotData.slots) {
    //   slotData.slots.map((sl) => {
    //     if (sl.length > 0) {
    //       if (sl[0]._id === updatedSlot._id) {
    //         sl[0] = updatedSlot;
    //       }
    //     }
    //     return sl;
    //   });
    // }
    // setSlotState(slotData);
  });
  return (
    <div className={classes.wrapper}>
      {isLoading && <Loader />}
      <div className={classes.slots}>
        {/* {data && data.result && data.result.slots && data.result.slots.map(sl=>{ */}
        {slotState &&
          slotState.slots.map((sl) => {
            return (
              <div className={classes.slot} key={uuid()}>
                <p className={classes.time}>{sl.time}</p>
                <p className={classes.book}>{sl.engaged ? "booked" : "free"}</p>

                {
                  sl.engaged &&
                  <div className={classes.details}>
                  <span>{sl.customerName ? sl.customerName :''}</span>
                  {sl.customerPhone &&
                   <span><a href={`tel:${sl.customerPhone}`}>
                   <img src={phone} alt="" className={classes.phone} />
                   </a></span>
                  }
                 
                  </div>
                }
               
                {
                    !sl.engaged &&
                    <button
                    className={classes.btn__book}
                    onClick={onBookingHandler.mutate.bind(this, sl.name)}
                  >
                    <div>
                      <p> book </p>
                    </div>
                  </button>
                }
                {
                    sl.engaged &&
                    <button
                    className={classes.btn__book}
                    onClick={undoBookingHandler.mutate.bind(this, sl.name)}
                  >
                    <div>
                      <p> undo book</p>
                    </div>
                  </button>
                }
               
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default WorkerSchedule;
