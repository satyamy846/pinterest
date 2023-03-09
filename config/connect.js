import mongoose from "mongoose";
const url = "mongodb://127.0.0.1:27017/pintrest";
export const connection = async()=>{
    try {
        //This means that, by default, Mongoose will filter out query filter properties that are not in the schema.
        // You can also disable strictQuery globally to override:
        mongoose.set('strictQuery', false); 
        await mongoose.connect(url) //connecting with mongoose
        console.log('Database connected sucessfully')
    }
    catch (error) {
        console.log(error)
    }
}