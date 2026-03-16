import express from 'express';
import mongoose from 'mongoose';


const app = express()
const port= 3000

app.use(express.json())

app.use("/api",router)


connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Running On Port ${port}`)
    })
})
