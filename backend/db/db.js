import mongoose from'mongoose';

const connectDB = async()=>{
    try {

      let conn
      if(process.env.NODE_ENV ==='production'){
       
         conn = await mongoose.connect(process.env.MONGO_PRO) 
      }else{
        conn = await mongoose.connect(process.env.MONGO_DEV) 
      }

    

      console.log(`Mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`mongoose Error ${error.message}`);
        process.exit(1)
    }
}

export default connectDB;