import express from 'express';
import {usercontroller} from '../controller/users.js';
import {auth} from '../middleware/auth.js';

const router = express.Router();

router.post('/users-signup',usercontroller.signup);

router.post('/users-login',usercontroller.login)


export default router;
