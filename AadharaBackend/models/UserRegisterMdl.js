'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({ 
  firstName : String,
  lastName : String,
  mobile : Number,
  email : String,
  pwd : String,
  refCode : String
  
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://naresh:adaraa2@ds161653.mlab.com:61653/adaraa',{ useNewUrlParser: true }).then(
    ()=>{
      console.log("connected to mongoDB")},
   (err)=>{
       console.log("err",err);
   })

module.exports = mongoose.model('UserRegister', userSchema);
