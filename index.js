import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import {connection} from './config/connect.js';
import userRouter from './routes/userRouter.js'
const app = express();


dotenv.config();
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // next is used to handler the error
});

connection();
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use(express.json());
app.use(userRouter);

const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("yes I am there");
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})