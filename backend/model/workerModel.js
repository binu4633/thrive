import mongoose from "mongoose";

const workerSchema = mongoose.Schema({
    name: {
        type: String,
       
      },
      email: {
        type: String,
        
       
      },
      address: {
        type: String,
        },
      phone:{
        type:Number,
       
      },
      image:{
        type:String
      }
});


const Worker = mongoose.model('Worker',workerSchema) ;

export default Worker;
// bridge of spice
// tinker tailor solidier spy