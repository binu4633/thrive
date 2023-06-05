import Worker from "../model/workerModel.js";
import Slot from "../model/slotModel.js";
import moment from "moment";
import User from "../model/userModel.js";
import {getIo} from '../../server.js';

const createWorker = async (req, res) => {


  try {
    // const newWorker = await Worker.create(req.body);

   

    const admin = req.user[0];

    if(!admin.isAdmin){
       throw new Error('cannot perform this operations')
    }

    const name = req.body.name;
    const phone = req.body.phone;
    const image = req.body.image;

   
    if (!req.body.id) {
      return;
    }

    const user = await User.findById(req.body.id);
   
    if (!user) {
      return;
    }
    if (name) {
      user.name = name;
    }

    if (phone) {
      user.phone = phone;
    }

    if (image) {
      user.image = image;
    }

    user.isWorker = true;

    await user.save();


    res.send({
      status: "success",
    });
  } catch (error) {
   

    res.send({
      satus: "failed",
      result: error,
    });
  }
};

const getWorkers = async (req, res) => {
  try {
    const workers = await User.find({ isWorker: true });

    res.send({
      status: "success",
      result: workers,
    });
  } catch (error) {
   
    res.send({
      status: "failed",
    });
  }
};

const getWorker = async (req, res) => {
 
  try {
    const id = req.params.id;

    
    const worker = await User.findById(id);

    res.send({
      status: "success",
      worker,
    });
  } catch (error) {
 
    res.send({
      status: "failed",
    });
  }
};

const activeWorker = async (req, res) => {
  
  try {
    const id = req.body.id;
    await User.findByIdAndUpdate({ _id: id }, { isWorkerActive: true });

    res.status(200).send({
      status: "success",
    });
  } catch (error) {
    res.status(200).send({
      status: "failed",
    });
  }
};
const blockWorker = async (req, res) => {

  try {
    const id = req.body.id;
    await User.findByIdAndUpdate({ _id: id }, { isWorkerActive: false });

    res.status(200).send({
      status: "success",
    });
  } catch (error) {
    res.status(200).send({
      status: "failed",
    });
  }
};

const deleteWorker = async (req, res) => {
 
};

const createAttendence = async (req, res) => {


  // return

  const slot1 = {
    name: "slot1",
    time: "9 AM to 9.30 AM",
    startingTime: 9,
  };
  const slot2 = {
    name: "slot2",
    time: "9.30 AM to 10 AM",
    startingTime: 9.3,
  };
  const slot3 = {
    name: "slot3",
    time: "10 AM to 10.30 AM",
    startingTime: 10,
  };
  const slot4 = {
    name: "slot4",
    time: "10.30 AM to 11 AM",
    startingTime: 10.3,
  };
  const slot5 = {
    name: "slot5",
    time: "11 AM to 11.30 AM",
    startingTime: 11,
  };
  const slot6 = {
    name: "slot6",
    time: "11.30 AM to 12 PM",
    startingTime: 11.3,
  };
  const slot7 = {
    name: "slot7",
    time: "12 PM to 12.30 PM",
    startingTime: 12,
  };
  const slot8 = {
    name: "slot8",
    time: "12.30 PM to 1 PM",
    startingTime: 12.3,
  };
  const slot9 = {
    name: "slot9",
    time: "2 PM to 2.30 PM",
    startingTime: 14,
  };
  const slot10 = {
    name: "slot10",
    time: "2.30 PM to 3 PM",
    startingTime: 14.3,
  };

  const slot11 = {
    name: "slot11",
    time: "3 PM to 3.30 PM",
    startingTime: 15,
  };
  const slot12 = {
    name: "slot12",
    time: "3.30 PM to 4 PM",
    startingTime: 15.3,
  };
  const slot13 = {
    name: "slot13",
    time: "4 PM to 4.30 PM",
    startingTime: 16,
  };
  const slot14 = {
    name: "slot14",
    time: "4.30 PM to 5 PM",
    startingTime: 16.3,
  };

  const slot15 = {
    name: "slot15",
    time: "5 PM to 5.30 PM",
    startingTime: 17,
  };
  const slot16 = {
    name: "slot16",
    time: "5.30 PM to 6 PM",
    startingTime: 17.3,
  };

  const slot17 = {
    name: "slot17",
    time: "6 PM to 6.30 PM",
    startingTime: 18,
  };
  const slot18 = {
    name: "slot18",
    time: "6.30 PM to 7 PM",
    startingTime: 18.3,
  };

  const slot19 = {
    name: "slot19",
    time: "7 PM to 7.30 PM",
    startingTime: 19,
  };
  const slot20 = {
    name: "slot20",
    time: "7.30 PM to 8 PM",
    startingTime: 19.3,
  };
  const slot21 = {
    name: "slot21",
    time: "8 PM to 8.30 PM",
    startingTime: 20,
  };
  const slot22 = {
    name: "slot22",
    time: "8.30 PM to 9 PM",
    startingTime: 20.3,
  };
  try {

    const user = req.user[0];
    if(!user.isAdmin){
      throw new Error('cannot do or perform this operation')
    }
    const date = req.body.date;

    const week = new Date(date).getDay();

    if(week == 0){
      throw new Error('sunday cannot add attendence')
    }

    

    const currentWorker = await User.findById(req.body.id);
  

   
    // const curretDate = new Date();
    



    const theDateString = moment(date).format("DD-MM-YYYY");
  
    const isAlreadyThere = await Slot.find({
      dateString: theDateString,
      workerId: currentWorker.id,
    });
    //   const isAlreadyThere = await Slot.find({dateString:theDateString});
    //    const isAlreadyThere = await Slot.find({workerId:currentWorker.id});

   
    // const hour = new Date().getHours()
    // const time = new Date().getTime()
    // const minutes = new Date().getMinutes()

   

    const dateValidCheck = (date) => {
      const year = new Date(date).getFullYear();
      const dateT = new Date(date).getDate();
      const month = new Date(date).getMonth();

      const currentyear = new Date().getFullYear();
      const curretDate = new Date().getDate();
      const currentMonth = new Date().getMonth();

    

      let yearValid;

      if (year === currentyear) {
        yearValid = true;
      } else if (currentMonth === 11) {
        if (currentyear + 1 === year) {
          yearValid = true;
        } else {
          yearValid = false;
        }
      } else {
        yearValid = false;
      }

      if (yearValid === false) {
        return false;
      }

      let monthValid;

      if (month === currentMonth) {
        monthValid = true;
      } else if (curretDate === 29 || curretDate === 30 || curretDate === 31) {
        if (currentMonth + 1 === month) {
          monthValid = true;
        } else if (currentMonth === 11 && month === 1) {
          monthValid = true;
        } else {
          monthValid = false;
        }
      } else {
        monthValid = false;
      }

      if (monthValid === false) {
        return false;
      }

      if (dateT < curretDate) {
        return false;
      } else {
        return true;
      }
    };

    const dateValid = dateValidCheck(date);

  

    if (dateValid === false) {
      res.status(200).send({
        status: "failed",
        result: "this date is not valid date",
      });
      return;
    }

    //    return

    if (isAlreadyThere.length > 0) {
      throw new Error("the date is alredy created");
    }

    const isSameDate = (date) => {
      const year = new Date(date).getFullYear();
      const dateT = new Date(date).getDate();
      const month = new Date(date).getMonth();

      const currentyear = new Date().getFullYear();
      const curretDate = new Date().getDate();
      const currentMonth = new Date().getMonth();

      if (
        year === currentyear &&
        dateT === curretDate &&
        month === currentMonth
      ) {
        return true;
      } else {
        return false;
      }
    };

    const sameDate = isSameDate(date);



    const currentTime = new Date().getHours() + new Date().getMinutes() / 100;
    // const localDate = new Date(date).toLocaleDateString("en-GB");
    const slot = await Slot.create({
      date: date,
      dateString: moment(date).format("DD-MM-YYYY"),
      worker: currentWorker.name,
      workerId: currentWorker._id,
      slots: [
        slot1,
        slot2,
        slot3,
        slot4,
        slot5,
        slot6,
        slot7,
        slot8,
        slot9,
        slot10,
        slot11,
        slot12,
        slot13,
        slot14,
        slot15,
        slot16,
        slot17,
        slot18,
        slot19,
        slot20,
        slot21,
        slot22,
      ],
    });

    // if(sameDate){
    //     slot.slots.map(sl=>{
    //        if(sl.startingTime < currentTime) {
    //          sl.enagaged = true
    //        }
    //        return sl
    //     })

    //     await slot.save()
    // }

    res.status(200).send({
      status: "success",
      result: "slot added successfully",
    });
  } catch (e) {
   
    res.send({
      status: "failed",
      result: e.message,
    });
  }
};
const createWorkerAttendence = async (req, res) => {
 

  const slot1 = {
    name: "slot1",
    time: "9 AM to 9.30 AM",
    startingTime: 9,
  };
  const slot2 = {
    name: "slot2",
    time: "9.30 AM to 10 AM",
    startingTime: 9.3,
  };
  const slot3 = {
    name: "slot3",
    time: "10 AM to 10.30 AM",
    startingTime: 10,
  };
  const slot4 = {
    name: "slot4",
    time: "10.30 AM to 11 AM",
    startingTime: 10.3,
  };
  const slot5 = {
    name: "slot5",
    time: "11 AM to 11.30 AM",
    startingTime: 11,
  };
  const slot6 = {
    name: "slot6",
    time: "11.30 AM to 12 PM",
    startingTime: 11.3,
  };
  const slot7 = {
    name: "slot7",
    time: "12 PM to 12.30 PM",
    startingTime: 12,
  };
  const slot8 = {
    name: "slot8",
    time: "12.30 PM to 1 PM",
    startingTime: 12.3,
  };
  const slot9 = {
    name: "slot9",
    time: "2 PM to 2.30 PM",
    startingTime: 14,
  };
  const slot10 = {
    name: "slot10",
    time: "2.30 PM to 3 PM",
    startingTime: 14.3,
  };

  const slot11 = {
    name: "slot11",
    time: "3 PM to 3.30 PM",
    startingTime: 15,
  };
  const slot12 = {
    name: "slot12",
    time: "3.30 PM to 4 PM",
    startingTime: 15.3,
  };
  const slot13 = {
    name: "slot13",
    time: "4 PM to 4.30 PM",
    startingTime: 16,
  };
  const slot14 = {
    name: "slot14",
    time: "4.30 PM to 5 PM",
    startingTime: 16.3,
  };

  const slot15 = {
    name: "slot15",
    time: "5 PM to 5.30 PM",
    startingTime: 17,
  };
  const slot16 = {
    name: "slot16",
    time: "5.30 PM to 6 PM",
    startingTime: 17.3,
  };

  const slot17 = {
    name: "slot17",
    time: "6 PM to 6.30 PM",
    startingTime: 18,
  };
  const slot18 = {
    name: "slot18",
    time: "6.30 PM to 7 PM",
    startingTime: 18.3,
  };

  const slot19 = {
    name: "slot19",
    time: "7 PM to 7.30 PM",
    startingTime: 19,
  };
  const slot20 = {
    name: "slot20",
    time: "7.30 PM to 8 PM",
    startingTime: 19.3,
  };
  const slot21 = {
    name: "slot21",
    time: "8 PM to 8.30 PM",
    startingTime: 20,
  };
  const slot22 = {
    name: "slot22",
    time: "8.30 PM to 9 PM",
    startingTime: 20.3,
  };
  try {

    const user = req.user[0];

    if(!user.isWorker){
     throw new Error('cannot perform this operation')
    }

    const date = req.body.date;
    const week = new Date(date).getDay();

    if(week == 0){
      throw new Error('sunday cannot add attendence')
    }
    const currentWorker = req.user[0];
   

    const curretDate = new Date();
    

    const theDateString = moment(date).format("DD-MM-YYYY");
 
    const isAlreadyThere = await Slot.find({
      dateString: theDateString,
      workerId: currentWorker.id,
    });
    //   const isAlreadyThere = await Slot.find({dateString:theDateString});
    //    const isAlreadyThere = await Slot.find({workerId:currentWorker.id});


    // const hour = new Date().getHours()
    // const time = new Date().getTime()
    // const minutes = new Date().getMinutes()

   

    const dateValidCheck = (date) => {
      const year = new Date(date).getFullYear();
      const dateT = new Date(date).getDate();
      const month = new Date(date).getMonth();

      const currentyear = new Date().getFullYear();
      const curretDate = new Date().getDate();
      const currentMonth = new Date().getMonth();


      let yearValid;

      if (year === currentyear) {
        yearValid = true;
      } else if (currentMonth === 11) {
        if (currentyear + 1 === year) {
          yearValid = true;
        } else {
          yearValid = false;
        }
      } else {
        yearValid = false;
      }

      if (yearValid === false) {
        return false;
      }

      let monthValid;

      if (month === currentMonth) {
        monthValid = true;
      } else if (curretDate === 29 || curretDate === 30 || curretDate === 31) {
        if (currentMonth + 1 === month) {
          monthValid = true;
        } else if (currentMonth === 11 && month === 1) {
          monthValid = true;
        } else {
          monthValid = false;
        }
      } else {
        monthValid = false;
      }

      if (monthValid === false) {
        return false;
      }

      if (dateT < curretDate) {
        return false;
      } else {
        return true;
      }
    };

    const dateValid = dateValidCheck(date);

    

    if (dateValid === false) {
      res.status(200).send({
        status: "failed",
        result: "this date is not valid date",
      });
      return;
    }

    //    return

    if (isAlreadyThere.length > 0) {
      throw new Error("the date is alredy created");
    }

    const isSameDate = (date) => {
      const year = new Date(date).getFullYear();
      const dateT = new Date(date).getDate();
      const month = new Date(date).getMonth();

      const currentyear = new Date().getFullYear();
      const curretDate = new Date().getDate();
      const currentMonth = new Date().getMonth();

      if (
        year === currentyear &&
        dateT === curretDate &&
        month === currentMonth
      ) {
        return true;
      } else {
        return false;
      }
    };

    const sameDate = isSameDate(date);



    const currentTime = new Date().getHours() + new Date().getMinutes() / 100;
    // const localDate = new Date(date).toLocaleDateString("en-GB");
    const slot = await Slot.create({
      date: date,
      dateString: moment(date).format("DD-MM-YYYY"),
      worker: currentWorker.name,
      workerId: currentWorker._id,
      slots: [
        slot1,
        slot2,
        slot3,
        slot4,
        slot5,
        slot6,
        slot7,
        slot8,
        slot9,
        slot10,
        slot11,
        slot12,
        slot13,
        slot14,
        slot15,
        slot16,
        slot17,
        slot18,
        slot19,
        slot20,
        slot21,
        slot22,
      ],
    });

    // if(sameDate){
    //     slot.slots.map(sl=>{
    //        if(sl.startingTime < currentTime) {
    //          sl.enagaged = true
    //        }
    //        return sl
    //     })

    //     await slot.save()
    // }

    res.status(200).send({
      status: "success",
      result: "slot added successfully",
    });
  } catch (e) {

    res.send({
      status: "failed",
      result: e.message,
    });
  }
};

const myScheduleDates = async (req, res) => {
   

    const user = req.user[0];
    try {
        // const id = req.params.id;

        const d = Date.now() - 24*60*60*1000
        const curretDate = new Date(d);

  

        // const scheduleDates = await Slot.find({workerId:id});
        const scheduleDates = await Slot.find({workerId:user._id,date:{$gte:curretDate}}).select('dateString');

    

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
};

const mySchedule = async(req,res)=>{
  
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

const bookingWorkerHandler = async(req,res)=>{

    
    const user = req.user[0]
  
    try {
     const slotId = req.body.scheduleId;
     const slotName =req.body.slotName;
 
       const slot = await Slot.findById(slotId);
 
    
 
     const slotSection =   slot.slots.find(sl=>sl.name === slotName);
 
     if(slotSection.engaged === true){
         throw new Error('the slot is already booked')
     }
 
    
 
 
     slotSection.engaged = true;
     slotSection.customerName = user.name;
     slotSection.customerEmailId = user.email;
 
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


 const undoBookingHandler = async(req,res)=>{

  try {

    const user = req.user[0];
    if(!user){
      throw new Error('you cant do this operation')
    }

    const slotName = req.body.slotName;
    const slotId = req.body.scheduleId;

    const  slot = await Slot.findById(slotId);

   
  
    const isRightWorker = String(slot.workerId) === String(user._id) ;
    
    if(!isRightWorker){
      throw new Error('you cant do this operation')
    }

    const slotSection =   slot.slots.find(sl=>sl.name === slotName);
 
    if(slotSection.engaged === false){
        throw new Error('the slot is already undo book')
    }

  


    slotSection.engaged = false;
    slotSection.customerName = '';
    slotSection.customerEmailId = '';

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

export {
  createWorker,
  getWorkers,
  getWorker,
  createAttendence,
  activeWorker,
  blockWorker,
  deleteWorker,
  createWorkerAttendence,
  myScheduleDates,
  mySchedule,
  bookingWorkerHandler,
  undoBookingHandler
};
