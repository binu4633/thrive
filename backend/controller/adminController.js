import User from "../model/userModel.js";
import Slot from "../model/slotModel.js";
const searchUser = async (req, res) => {
  try {
  

    const keyword = req.body.keyword || "";
    const page = req.body.page * 1 || 1;

    //    if(!keyword || keyword.length >20){
    //     return
    //    }
   
    const limit = 7;
    const skip = (page - 1) * limit;
    const totalNum = await User.countDocuments({
      email: { $regex: keyword, $options: "i" },
    });
    const totalPage = Math.ceil(totalNum / limit);
    const user = await User.find({ email: { $regex: keyword, $options: "i" } })
      .select("name email phone image userStatus")
      .skip(skip)
      .limit(limit);
    //    const user = await User.paginate({email:{  $regex:keyword,$options:'i'}},{page:1,limit:2})
   

    res.status(200).send({
      status: "success",
      user,
      totalPage,
    });
  } catch (error) {
    res.send({
      status: "failed",
    });
  }
};

const getMemberRequest = async (req, res) => {
  try {
    const activeMemberRequest = await User.find({
      memberRequestStatus: "active",
    }).select("email name phone image");

    res.status(200).send({
      status: "success",
      activeMemberRequest,
    });
  } catch (error) {
    res.send({
      status: "failed",
    });
  }
};

const acceptMemberRequest = async (req, res) => {
 

  try {

    const admin = req.user[0];

    if(!admin.isAdmin){
      throw new Error('cannot perform this operation')
    }

    const user = await User.findById(req.body.id);

   

    user.isMember = true;
    user.memberRequestStatus = "accepted";

    await user.save();

    res.status(200).send({
      status: "success",
    });
  } catch (error) {
    res.send({
      status: "failed",
    });
  }
};
const rejectMemberRequest = async (req, res) => {


  try {
    const admin = req.user[0];

    if(!admin.isAdmin){
      throw new Error('cannot perform this operation')
    }
    const user = await User.findById(req.body.id);

    

    user.memberRequestStatus = "rejected";

    await user.save();

    res.status(200).send({
      status: "success",
    });
  } catch (error) {
    res.send({
      status: "failed",
    });
  }
};

const userActivate = async (req, res) => {
  try {

    const admin = req.user[0];

    if(!admin.isAdmin){
      throw new Error('cannot perform this operation')
    }

    const id = req.body.id;
    if (!id) {
      return;
    }

    const user = await User.findById(id).select(
      "name email phone image userStatus"
    );

    user.userStatus = "active";

    await user.save();

    //    const activatedUser =  await User.findByIdAndUpdate(id,{userStatus:'active'});

   

    res.status(200).send({
      status: "success",
      user,
    });
  } catch (error) {
    res.send({
      status: "failed",
    });
  }
};
const userBlock = async (req, res) => {
  try {
    const admin = req.user[0];

    if(!admin.isAdmin){
      throw new Error('cannot perform this operation')
    }

    const id = req.body.id;
    if (!id) {
      return;
    }

    const user = await User.findById(id).select(
      "name email phone image userStatus"
    );

    user.userStatus = "blocked";

    await user.save();

   

    // await User.findByIdAndUpdate(id,{userStatus:'blocked'});

    res.status(200).send({
      status: "success",
      user,
    });
  } catch (error) {
    res.send({
      status: "failed",
    });
  }
};
const userDelete = async (req, res) => {
  try {
    const admin = req.user[0];

    if(!admin.isAdmin){
      throw new Error('cannot perform this operation')
    }

     const id = req.body.id;

     await User.findByIdAndDelete(id);

     res.status(200).send({
      status:'success',
      id
     })
  } catch (error) {
    res.send({
      status:'failed'
     })
  }
};

const expiredDates = async (req, res) => {
  try {
    
    const page = req.query.page*1 || 1;
    const d = Date.now() - 24 * 60 * 60 * 1000;
    const curretDate = new Date(d);

    const limit = 10;
    const skip = (page - 1) * limit;
    const totalNum = await Slot.countDocuments({
      date: { $lte: curretDate }  
    })

  
    const totalPage = Math.ceil(totalNum / limit);
    const scheduleDates = await Slot.find({
      date: { $lte: curretDate },
    }).select("dateString worker")
    .skip(skip)
    .limit(limit);
    
    res.status(200).send({
       result:scheduleDates,
       pageTotal:totalPage
    })
  } catch (e) {
    res.send({
        error:e.message
    })
  }
};

export {
  searchUser,
  getMemberRequest,
  acceptMemberRequest,
  rejectMemberRequest,
  userActivate,
  userBlock,
  userDelete,
  expiredDates
};
