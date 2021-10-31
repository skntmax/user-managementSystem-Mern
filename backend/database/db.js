const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/management", {
    useNewUrlParser: true,
     useUnifiedTopology: true
 
 }).then(()=>{
      console.log('management database connected ')
 }).catch(err=>{ 
     console.log("error")
 })

const userModel = mongoose.model('user' , {
    username:{
         type:String,
         required:true 

    }, 
    email:{
       type:String,
       required:true 

  },
  password:{
   type:String ,
   required:true

   } ,
    profile:{
        type:String 
              
    },
    phone:{ 
        type:String
    },
    dob:{
        type:String
    },
    image:{
         type:String
    },
    jwttoken: { 
                 type : String
             }
        
    
})

module.exports = userModel  


