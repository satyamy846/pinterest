import {users} from "../models/users.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomError from "../utils/errorhandler.js";

export const usercontroller = {
    async signup(req,res,next) {
        const {firstname, lastname,email,password} = req.body;
        try {
            const existinguser = await users.findOne({ email: email });
            if (existinguser) {
                // console.log(`User already exists`);
                return res.status(400).json({
                    message:`user already exists`
                })
            }

            const hashedpassword = await bcrypt.hash(password,10);
            const result = await users.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hashedpassword,

            })
            const token = await jwt.sign({email: result.email ,id: req._id},process.env.SECRET_KEY)  //sign(payload,secretkey) payload-> used to store that if it is a valid user or not| secretkey
            res.status(201).json({users:result,token:token})

        }
        catch (err) {
            next(new CustomError(err.message, 500,"Unable to Signup"))
        }
    },
    async login(req,res,next) {
        const {email,password} = req.body;
        try{ 
            //first check if user exists or not
            const existinguser = await users.findOne({email:email});
            if(!existinguser){
                return res.send(404).json({message:`User not found`});
            }
            // console.log(password);
            // console.log(existinguser);
            // console.log("Db password" + existinguser.password);
            const matchedpassword = bcrypt.compare(password,existinguser.password);
            if(!matchedpassword){
                return res.send(401).json({message:`Invalid Credential`});
            }
            const token = jwt.sign({email:existinguser.email,id:existinguser._id},process.env.SECRET_KEY);
            res.status(200).json({
                message:`User is Logged In`,
                token:token
            })
        }
        catch(err){
            console.log(err); 
            next(new CustomError(err.message,500,"Unable to Login"))
        }
    }
}