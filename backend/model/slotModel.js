import mongoose from "mongoose";

const slotSchema = mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    dateString:{
        type:String
    },
    isValidDate:{
        type:Boolean,
        default:true
    },
    workerId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Worker'
    },
    worker:{
        type:String
    },
    slots:[
        {
          name:{
            type:String,
            default:'slot1'
          },
          time:{
            type:String,
            default:'9 AM to 9.30 AM'
        },
        engaged:{
            type:Boolean,
            default:false
        },
        customerName:{
            type:String
        },
        customerEmailId:{
            type:String
        },
        customerPhone:{
            type:Number
        },
        startingTime:{
            type:Number
        }
      
        },
 
       
    ],
   
   
    
})


const Slot = mongoose.model('Slot',slotSchema);

export default Slot;