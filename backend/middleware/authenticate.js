const jwt = require('jsonwebtoken')
const userModel = require('./../database/db')
const authenticate = async (req,res,next)=>{
    try{
         const token  = req.cookies.jwt 
         console.log(token)
        const varifytoken =  await jwt.verify(req.cookies.jwt,'shashikantkumarmax' )
        const rootuser= await userModel.findOne({ _id:varifytoken._id , jwttoken:token  })   
       console.log(varifytoken)
        if(!rootuser){ throw new Error('user not found ')}
       req.token= token;
       req.rootuser= rootuser 
       req.userId= rootuser._id 
            next()

    }
    catch(err){
         res.status(401).send("unauthorized user ")
         console.log(err)
    }
      

}

 
module.exports= authenticate