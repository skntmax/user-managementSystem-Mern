const router = require('express').Router()
const express = require('express')
const userModel = require('./../database/db')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const authenticate = require('./../middleware/authenticate')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(express.json());   
router.use(require('./imageupload'));   

router.post('/register' ,async (req,res)=>{
   const result =await userModel.find({ $or :[{ email:req.body.email} ,{ password: req.body.password} , {username: req.body.username}]} ) 
  console.log( result )
   if( result!="" ) {
     res.send( {  success: 0 , message: " 🧐🧐🧐 user already exist , please login with another email 🧐🧐🧐 " } )     
   }
    else{
     let hashPass=await bcrypt.hash(req.body.password , 10 )
     const userResult =  new userModel({ 
     "username" : req.body.username ,
     "email" : req.body.email,
     "password" : hashPass
  }) 

   
  if( await userResult.save() ){
       res.send({
             success: 1 , 
             message:"Hurray account created 😍😍😍 " 
       }) 
  }
  else { 
     res.send( {  success: 0 , message: "user not added🥺🥺  " } ) 
       
  }      
         
   }  
})



router.post('/login' , async(req,res) =>{ 
     const result =await userModel.find({ $or :[ { email:req.body.email} , {username: req.body.username}]} ) 

    if(result=="")
     { 
      res.send({ 
            success: 0 ,
            message:" please signup first " 
      }) 
          }
     else{ 
    let normalPass=await bcrypt.compare(req.body.password , result[0].password )

    if(normalPass && ( result[0].email==req.body.email )){
         let token = await jwt.sign({_id:result[0]._id} ,'shashikantkumarmax')   
           const jwtupdate =await userModel.findOneAndUpdate({_id:result[0]._id } ,{ jwttoken: token })
            res.cookie(`jwt` , token , {expire : new Date() + 9999})
            if(jwtupdate){
               res.send({
                  success:1 ,
                  user : result[0], 
                  message: "succesfull" 
               })
            }
            else{
               res.send({ 
                  success: 0 ,
                  message:" Token not generated  " 
            })
            }
     }
     else{ 
             res.send( {message : "invalid credentials " })
         }       
          
      }
})


router.post('/update' ,async(req,res)=>{
   
   try{
      const result= await userModel.findByIdAndUpdate(req.body.id , {
         email: req.body.email , 
         username: req.body.username,
         dob: req.body.dob, 
         phone: req.body.phone })
        if(result){
            res.status(200).send({ success:1 , message:"records updated " })
        }
        else{
         res.status(404).send({ success:0 , message:"error " })
            
        }     
   }catch(err){
         res.status(404).send({ success:0 , message:err })
       
   }
})



router.get('/about' ,authenticate,(req,res)=> {
   
    res.send( { message:"about page  " , user:req.rootuser } )
     
   })
   
router.get('/dashboard' ,authenticate,(req,res)=> { 

res.send( { message:"about page  " , user:req.rootuser } )

})
     


router.get('/logout' ,(req,res)=> {

res.clearCookie('jwt' )
 res.status(200).send("logged out ")

})


module.exports= router 