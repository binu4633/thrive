import Worker from '../model/workerModel.js';
import User from '../model/userModel.js';
import moment from 'moment';
import Slot from '../model/slotModel.js';
import {getIo} from '../../server.js';
import jwt from "jsonwebtoken";
import generateToken from '../utils/generate-token.js';

const workersForBooking = async(req,res)=>{

    try {
       
        const workers = await User.find({isWorker:true,isWorkerActive:true});
    
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

const getBookingSchedule = async(req,res)=>{
  try {
    const id = req.params.id;
  

    const day1 = Date.now();
    const day2 = Date.now()+ 24*60*60*1000;
    const day3 = Date.now() +2*24*60*60*1000;

    const date1 = new Date(day1);
    const date2 = new Date(day2);
    const date3 = new Date(day3);

    const theDateString1 = moment(date1).format('DD-MM-YYYY');
    const theDateString2 = moment(date2).format('DD-MM-YYYY');
    const theDateString3 = moment(date3).format('DD-MM-YYYY');

  

    const s1 = await Slot.find({workerId:id,dateString:theDateString1});
    const s2 = await Slot.find({workerId:id,dateString:theDateString2});
    const s3 = await Slot.find({workerId:id,dateString:theDateString3});

  

    res.status(200).send({
        status:'success',
        slots:[s1,s2,s3]
    })
  } catch (error) {
    res.send({
        status:'failed'
    })
  }
}

const bookingUserHandler = async(req,res)=>{
    
   try {
    const user = req.user[0];
   

    if(!user.isMember ){
      throw new Error('not a member to booking')
    }

    if(user.userStatus==="blocked"){
      throw new Error('you cannot book right now')
    }

 
    const slotId = req.body.scheduleId;
    const slotName =req.body.slotName;

      const slot = await Slot.findById(slotId);
      const slotSection =   slot.slots.find(sl=>sl.name === slotName);
    
      const theDateString = moment(Date.now()).format("DD-MM-YYYY");
   

    if(theDateString === slot.dateString){
    
      const currentTime = new Date().getHours() + new Date().getMinutes()/100;
  

      if(currentTime > slotSection.startingTime *1){
         throw new Error('cannot book this time');
      }
    }


    if(slotSection.engaged === true){
        throw new Error('the slot is already booked')
    }

  


    slotSection.engaged = true;
    slotSection.customerName = user.name;
    slotSection.customerEmailId = user.email;
    slotSection.customerPhone = user.phone;

    await slot.save()

   

    const io = getIo();
    io.emit("updateSlot",slot);  

      res.status(200).send({
        status:'success'
      })

   } catch (error) {
   
    res.status(200).send({
        status:'failed'
      })

   }
    
}


const googleAuth = async (req, res) => {
    try {
      const { token } = req.body;
      const newUser = jwt.decode(token);
      const userEmail = newUser.email;
      const user = await User.find({ email: newUser.email });
  
      if (user.length === 0 || !user) {
        const createdUser = await new User({
          name: newUser.name,
          email: newUser.email,
          image: newUser.picture,
        });
        const newCreatedUser = await createdUser.save();
        res.send({
          status: "success",
          userInfo: {
            name: newCreatedUser.name,
            email: newCreatedUser.email,
            image: newCreatedUser.image,
            isWorker:newCreatedUser.isWorker,
            isAdmin:newCreatedUser. isAdmin,
            isMember:newCreatedUser.isMember,
            // token,
            token: generateToken(newCreatedUser._id),
          },
        });
      } else {
        res.send({
          status: "success",
          userInfo: {
            name: user[0].name,
            email: user[0].email,
            image: user[0].image ? user[0].image : "",
          
            isWorker:user[0].isWorker,
            isAdmin:user[0].isAdmin,
            isMember:user[0].isMember,
            token: generateToken(user[0]._id),
            // token,
          },
        });
      }
    } catch (e) {
    
      res.status(500).send({
        status: "failed",
        error: "something wrong please try again",
      });
    }
  };

const addMemberRequest = async(req,res)=>{
  
    const user = req.user[0];
    try {

        if(!user){
            throw new Error('something went wrong');
        }
        if(!req.body.phone){
            throw new Error('something went wrong');
        }

        user.memberRequestStatus = 'active';
        user.phone = req.body.phone

        await  user.save();

        res.status(200).send({
            status:'success',
           
        })
        
    } catch (error) {
        
        res.status(200).send({
            status:'failed'
        })
    }
}

const expiryCheck = async(req,res)=>{
  try {
  
    res.send({
      error:req.error
    })
  } catch (error) {
    res.send('no hai')
  }
}

export {workersForBooking,getBookingSchedule,bookingUserHandler,googleAuth, addMemberRequest,expiryCheck}