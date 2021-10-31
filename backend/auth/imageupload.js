const express  = require('express')
const imagerouter= require('express').Router()
const bodyParser= require('body-parser')
const multer = require('multer')
const fs = require('fs')
const path= require('path')
imagerouter.use(bodyParser.urlencoded({ extended: false }))
imagerouter.use(express.json());

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/files");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.originalname}.${ext}` );
    },
  });


  const multerFilter = (req, file, cb) => {
    if (file.mimetype.split( "/" )[1] === "jpeg") {
      cb(null, true);
    } else {
      cb(new Error("Not a jpeg File!!"), false);
    }
  };

  const upload = multer({  
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  imagerouter.post("/api/uploadFile", upload.single("myFile") , (req, res) => {
    console.log(req.file);      
res.json({ 
  succes: 1 , 
  url: __dirname+"/public/files/"  
})

})
    

module.exports= imagerouter