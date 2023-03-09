import mongoose from "mongoose";
import isemail from '../node_modules/validator/lib/isEmail.js';


const schema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"First name is required!"]
    },
    lastname:{
        type:String,
        required:[true,"Last name is required!"]
    },
    email:{
        type:String,
        required:[true,"email is required!"],
        unique:true,
        lowercase:true,
        validate:[isemail,"Please Enter valid email"]
    },
    password:{
        type:String,
        required:true,
        minlength:[5,'Please enter atleast 5 characters']
    },
});


export default moderators = new mongoose.model("moderators",schema);