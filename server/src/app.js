import express from 'express'

import mongoose from 'mongoose'
import {config} from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

const app = express()
config()

//Middleware

app.use(cors())
app.use(express.json())
//Routes
app.use('/auth',authRoutes)
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((error)=>{
    console.error('Error connecting to MongoDB: ',error.message)
})
console.log("MongoDB URI:", process.env.MONGODB_URI);
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})