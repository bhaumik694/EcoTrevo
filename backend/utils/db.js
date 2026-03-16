import mongoose from "mongoose";
import env from "dotenv"

const URI = process.env.URI;


async function connectDB(){
    try {
        await mongoose.connect(URI)
        console.log("Connection to database Successful")
    } catch (error) {
        console.error("Database Connection Failed")
        process.exit(0)
        
    }
}

export default connectDB