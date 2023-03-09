import jwt from 'jsonwebtoken';

export const auth = {
    async authenticate(req,res,next){
        try{
            let token = req.headers.authorization;
            if(token){
                token = token.split(' ')[1];
                const user = jwt.verify(token,proces.env.SECRET_KEY);
                req.userId = user.id;
            }
            else{
                res.status(400).json({message:`Unauthorized User token Not found`})
                return;
            }
            next();
        }
        catch(err){
            console.log(err);
            res.status(401).json({message:"Unauthorized user wrong token"});
            return;
        }
    }
}