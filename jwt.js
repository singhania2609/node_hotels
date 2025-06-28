const jwt=require('jsonwebtoken');

const jwtMiddleWare=(req,res,next)=>{

    //first check request headers has authorization or not
    const authorization=req.headers.authorization
    if(!authorization) return res.status(401).json({error:'Toke not found'});


    //Extract the jwt token from the request headers
    const token= req.headers.authorization.split('')[1];
    if(!token) return res.status(401).json({error: "Unauthorizatized"});

    try{
        //verify the JWT token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //Attach user information to the request object
        req.userplayload=decoded;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({error: 'invalid token'});
    }
}


//function to generate JWT Token
const generateToken=(userData)=>{
    //generate a new jwt token using user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000})
}

module.exports={jwtMiddleWare ,generateToken};