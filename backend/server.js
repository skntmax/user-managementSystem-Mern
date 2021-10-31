const express = require('express')  
const app = express();
const port = 4000 || process.env.PORT
const hbs = require('hbs');
const bodyParser= require('body-parser')
const  fs = require('fs')
var cookieParser = require('cookie-parser')
app.use(cookieParser())

const router = require('./auth/auth') 
app.use(router)
app.use(require('./database/db')) 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static( __dirname+"/assets/" ))

 

app.get('/switch',(req,res)=>{ 
res.send('hiiii')

})

app.listen(port, ()=>{ 
    console.log(`server started at ${port}`)
})