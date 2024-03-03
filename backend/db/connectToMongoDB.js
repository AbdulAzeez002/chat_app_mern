import mongoose from "mongoose";

// const connectToMongoDB=async()=>{
//     try {
//         await mongoose.connect(process.env.MONGO_DB_URL)
//         console.log('connected to mongodb')
//     } catch (error) {
//        console.log(error.message,'error') 
//     }
// }

// export default connectToMongoDB;

// const mongoose=require('mongoose')

const connectToMongoDB=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/ChatApp',{
        useNewUrlParser:true,
       
    }).then(()=>{
        console.log(`db connected`);
    }).catch((e)=>{
        console.log('db not connected');
    })
}

export default connectToMongoDB;