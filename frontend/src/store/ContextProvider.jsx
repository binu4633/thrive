import React,{useReducer} from 'react';
import ContextStore from './context-store';

const defaultStoreState = {
    isServiceIntersecting:false,
    isLoginAreaOpen:false,
    userInfo:localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null,
    slotData:[]
  }

const storeReducer = (state,action)=>{
   if(action.type === 'SHOW-LOGIN-AREA'){

   const  LoginAreaOpen = !state.isLoginAreaOpen

    return {
        // isLoginAreaOpen:false,
       isLoginAreaOpen :LoginAreaOpen,
       slotData:state.slotData
    }
   }

   if(action.type === 'SERVICE-INTER-SECTION'){
    const intersectionResult = action.payLoad;
 
    return {
       isLoginAreaOpen:state.isLoginAreaOpen,
       isServiceIntersecting:intersectionResult
    }
  }
   if(action.type === 'ADD-USER-INFO'){
    const loginData = action.payLoad;
    localStorage.setItem('userInfo',JSON.stringify(loginData));
   
    return {
       isLoginAreaOpen:state.isLoginAreaOpen,
       isServiceIntersecting:state.isServiceIntersecting,
       userInfo:localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null
    }
  }

  if(action.type === 'REMOVE-USER-INFO'){
    localStorage.removeItem('userInfo')
  }

//    if(action.type === 'GET-SLOT-DATA'){
//      const newSlotData = action.payLoad.slots;

//      return {
//         isLoginAreaOpen:state.isLoginAreaOpen,
//         slotData:newSlotData
//      }
//    }
   return defaultStoreState;
}


function ContextProvider(props) {
    const [storeState, dispatchStoreAction] = useReducer(storeReducer,defaultStoreState);


    const displayLoginAreaHandler = ()=>{
        dispatchStoreAction({
            type:'SHOW-LOGIN-AREA'
        })
    }
    const serviceIntersectionHandler = (result)=>{
      
        dispatchStoreAction({
            type:'SERVICE-INTER-SECTION',payLoad:result
        })
    }


    const loginHandler = (user)=>{
        dispatchStoreAction({
            type:'ADD-USER-INFO',payLoad:user
        })
    }
    const logoutHandler = ()=>{
        dispatchStoreAction({
            type:'REMOVE-USER-INFO',
        })
    }

    const getSlotsHandler = (slots)=>{
        dispatchStoreAction({
            type:'GET-SLOT-DATA',payLoad:slots
        })
    }
    const storeContext = {
        isLoginAreaOpen :storeState.isLoginAreaOpen,
        isServiceIntersecting:storeState.isServiceIntersecting,
        // userInfo:storeState.userInfo,
        userInfo:localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null,
        // slotData:storeState.slotData,
        showLoginArea :displayLoginAreaHandler,
        serviceIntersection:serviceIntersectionHandler,
        login:loginHandler,
        logout:logoutHandler,
        // getSlots:getSlotsHandler

    }

   
  return (
    <ContextStore.Provider value={storeContext}>
      {props.children}
    </ContextStore.Provider>
  )
}

export default ContextProvider
