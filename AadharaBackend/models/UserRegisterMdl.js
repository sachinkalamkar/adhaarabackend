'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({ 
  customer_id : String,
  name : String,
  country : String,
  mobile : Number,
  email : String,
  status : String,
  registred_time : { type : Date, default: Date.now }, 
  services : [
    {
     
     service_category: String,
     service_name:String,
     count: Number,
     price:Number,
     service_registred_time : { type : Date, default: Date.now }
     
    }
]
  
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://sachinkalamkar:sachin4193@ds217970.mlab.com:17970/adhaara',{ useNewUrlParser: true }).then(
    ()=>{
      console.log("connected to mongoDB")},
   (err)=>{
       console.log("err",err);
   })

module.exports = mongoose.model('userRegister', userSchema);
