import Worker from '../model/workerModel.js';
import Slot from '../model/slotModel.js';
import User from '../model/userModel.js';

const getWorkers = async(req,res)=>{



    try {

      const user = req.user[0];
      
      if(!user.isAdmin){
        throw new Error('cannot do operation')
      }

     const workers = await User.find({isWorker:true, isWorkerActive:true});
 
     res.send({
         status:"success",
         result:workers
     })
    } catch (error) {

     res.send({
         status:'failed'
     })
    }
 
 }

 const getWorkersScheduleDates = async(req,res)=>{
  
   
  
    try {
        const id = req.params.id;

        const d = Date.now() - 24*60*60*1000
        const curretDate = new Date(d);

     

        // const scheduleDates = await Slot.find({workerId:id});
        const scheduleDates = await Slot.find({workerId:id,date:{$gte:curretDate}}).select('dateString');

      

        res.status(200).send({
            status:"success",
            result:scheduleDates
        })
    } catch (error) {
        res.status(200).send({
            status:"failed",
            result:'something went wrong '
        })
    }
 }

 const scheduleById = async(req,res)=>{
    try {
       const id = req.params.id;
       const slot = await Slot.findById(id);

      

       res.status(200).send({
        status:'success',
        result:slot
       })
    } catch (error) {
       
        res.status(200).send({
            status:'failed',
            error:'something went wrong please try again'
           })
    }
 }

 const deleteSlot = async(req,res)=>{
    try {
       const id = req.params.id;
    const response =   await Slot.findByIdAndDelete(id);
    
    res.send({
        status:'success',
        id:response._id
    })

    } catch (error) {
        res.send({
            status:'failed'
        })
    }
 }

 
 export {getWorkers,getWorkersScheduleDates,scheduleById,deleteSlot}