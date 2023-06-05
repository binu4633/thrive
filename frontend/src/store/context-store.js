import React from "react";

const ContextStore =  React.createContext({
    isLoginAreaOpen:false,
    isServiceIntersecting:false,
    userInfo:null,
    slotData:[]
    // items:[],
    // totalAmount:0,
    // addItem:(item)=>{},
    // removeItem:(id)=>{},
    // clearCart:()=>{}
})

export default ContextStore;