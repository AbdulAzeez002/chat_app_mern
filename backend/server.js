
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectToMongoDB from './db/connectToMongoDb.js';

import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();
const PORT=process.env.PORT || 5000

const app=express();


app.use(express.json())   // to parse the incoming requests with json payloads  (from req.body)
app.use(cookieParser())  // to parse the cookies
app.use(cors())
app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)


app.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`server running on port ${PORT}`)})