import React, { useState ,useContext, useEffect,useRef} from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import ContextStore from "../store/context-store";
import classes from "./bookingSchedule.module.css";
import PageOne from "../components/userBooking/PageOne";
import PageTwo from "../components/userBooking/PageTwo";
import PageThree from "../components/userBooking/PageThree";
import {socket} from '../socket.js';
import Loader from "../components/loader/Loader";
function BookingSchedule() {
    const storeCtx = useContext(ContextStore);
  const params = useParams();
  const id = params.id;
  const [sliderCount, setSliderCount] = useState(0);
  const [iconCount, setIconCount] = useState(1);
  const [slotState,setSlotState] = useState();
  

  let { isLoading, error, data } = useQuery({
    queryKey: ["bookingSchedule"],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/user/bookingSchedule/${id}`);
   
    if(response.data.slots){
      
        // storeCtx.getSlots(response.data.slots)
        setSlotState(response.data)
    }
      return response.data;
    },
    // staleTime: 1000 * 20
    
  });

 

//   useEffect(()=>{
//     storeCtx.getSlots(['hai','hai not'])
//   },[])


//   const slotQuery = useQuery({
//     queryKey: ["bookingSchedule"],
//     queryFn: async () => {
//       const response = await axios.get(`/api/v1/user/bookingSchedule/${id}`);
//     
//       return response.data;
//     },
//   });

//   if(slotQuery.data){
//    
//     storeCtx.getSlots(slotQuery.data.slots)
//   }




  let startX;
  let startY;
  let endX;
  let endY;

  const sliderTouchStart = (e) => {
    
    [...e.changedTouches].forEach((t) => {
      startX = t.clientX;
      startY = t.clientY;
      
    });
  };

  const sliderTouchEnd = (e) => {
    [...e.changedTouches].forEach((t) => {
      endX = t.clientX;
      endY = t.clientY;
     

      if (startX < endX) {
      
        if (sliderCount !== 0) {
          if (sliderCount === 0) {
            setSliderCount((3 - 1) * -100);
            // return
          }
          setSliderCount(sliderCount + 100);
          setIconCount((prev) => prev - 1);
        }
      }
      if (startX > endX) {
        
        //   if(sliderCount !== -400){

        if (sliderCount === (3 - 1) * -100) {
          //   setSliderCount(0);
          return;
        }
        // if (sliderCount === (images.length - 1) * -100) {
        setSliderCount(sliderCount - 100);
        setIconCount((prev) => prev + 1);
      }

      // }
    });
  };



// if(data && data.slots){
//     
//     storeCtx.getSlots(data.slots)
// }
let x =5;

let slotData = data



       




  const slideMotion = {
    // transform: `translateX(-${sliderCount*100}%)`,
    // transform: `translateX(-200%)`,
    transform: `translateX(${sliderCount}%)`,
    transition: "all 0.5s",
  };

  const iconPageHandler = (i) => {
    
    setSliderCount((i - 1) * -100);
    setIconCount(i);
  };

  const bgIcon1 = {
    backgroundColor: "var(--bg-dark-1)",
  };
  const bgIcon2 = {
    backgroundColor: "var(--bg-1)",
  };
  return (
    <div className={classes.wrapper}>
        {isLoading && <Loader/>}
      <div
        className={classes.slots__slider__wrapper}
        style={slideMotion}
        onTouchStart={sliderTouchStart}
        onTouchEnd={sliderTouchEnd}
      >
        {/* <div className={classes.slots__slider__wrapper} > */}
        <div className={classes.slide}>
            {/* {data && data.slots && <PageOne slot={data.slots[0]}/>} */}
            {/* {slotData && slotData.slots && <PageOne slot={slotData.slots[0]}/>} */}
            {slotState && slotState.slots && <PageOne slot={slotState.slots[0]}/>}
           
        </div>
        <div className={classes.slide}>
        {/* {data && data.slots && <PageTwo slot={data.slots[1]}/>} */}
        {slotState && slotState.slots  && <PageTwo slot={slotState.slots[1]}/>}
        </div>
        <div className={classes.slide}>
        {/* {data && data.slots && <PageThree slot={data.slots[2]}/>} */}
        {slotState && slotState.slots && <PageThree slot={slotState.slots[2]}/>}
        </div>
      </div>

      {!storeCtx.isServiceIntersecting &&
        <div className={classes.page__icon}>
        <button
          className={classes.btn__page}
          onClick={iconPageHandler.bind(this, 1)}
          style={iconCount === 1 ? bgIcon1 : bgIcon2}
        ></button>
        <button
          className={classes.btn__page}
          onClick={iconPageHandler.bind(this, 2)}
          style={iconCount === 2 ? bgIcon1 : bgIcon2}
        ></button>
        <button
          className={classes.btn__page}
          onClick={iconPageHandler.bind(this, 3)}
          style={iconCount === 3 ? bgIcon1 : bgIcon2}
        ></button>
      </div>
      }

     
    </div>
  );
}

export default BookingSchedule;
