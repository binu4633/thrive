const { randomBytes,createHash } = await import('node:crypto');
import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
     },
    email: {
      type: String,
      required: true,
      unique: true,
     
     
    },
    phone:{
        type:Number
    },
    
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isWorker: {
      type: Boolean,
      default: false,
    },
    isMember:{
        type:Boolean,
        default:false   
    },
    memberRequestStatus:{
        type:String,    
        enum:['active','rejected','accepted']
    },
    isWorkerActive: {
      type: Boolean,
      default: false,
    },
    image:String,
    userStatus:{
        type:String,
        default:'active',
        enum:['active','blocked']
    }
   },
  {
    timestamps: true,
  }
);

// userSchema.methods.matchPassword = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword,this.password)
// }


// userSchema.pre('save', async function(next){
//     const user = this;
  
  
//     if(user.isModified('password')){
//         user.password = await bcrypt.hash(user.password,8)
//     }
  
//     // console.log('just before saving ');
  
//     next()
//   })

// userSchema.methods.createPasswordResetToken =  function(){
//   const resetToken = randomBytes(32).toString('hex');
//   this.passwordResetToken =  createHash('sha256').update(resetToken).digest('hex');
//   this.passwordResetExpires = Date.now() + 10*60*1000;



//   return resetToken;
// }


const User = mongoose.model("User", userSchema);
export default User;
