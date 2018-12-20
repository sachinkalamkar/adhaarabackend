const mongoose = require('mongoose');

mongoose.connect('mongodb://sachinkalamkar:sachin4193@ds217970.mlab.com:17970/adhaara', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.log('Oops something wend wrong', err));

   
  const saloonSchema = new mongoose.Schema({
    user_type : { type : String, default : "salon" },
    name_of_salon : String,
    type_of_salon : String,
    first_name_salon_owner : String,
    last_name_salon_owner : String, 
    salon_owner_phone : Number,
    address_of_owner : String,
    address_of_salon : String,
    city_of_owner : String,
    city_of_salon : String,
    country_of_salon : String,
    emirates_id_of_owner : String,
    email_of_owner : String,
    email_of_salon : String,
    pin_of_owner : Number,
    pin_of_salon : Number,
    gender_of_owner : String,
    image_of_salon : String,
    salon_open_time : String,
    salon_close_time : String,
    request_date : { type:Date, default:Date.now },
    status_of_registration : { type:Boolean, default:false },
    request_status : { type:Boolean, default:true },
    bank_name : String,
    branch_of_bank : String,
    bank_account_number : Number,
    account_holder_name : String,
    iban_number : String,
    user_name : String,
    password : String,
    set_password_id : String,
    services : [
         {
          service_category: String,
          service_name:String,
          image_of_service : String,
          prices:Number,
          service_duration:String
         }
     ],
     stylist_details : [
       {
          stylist_first_name : String,
          stylist_last_name : String,
          stylist_age : Number,
          stylist_speciality : String,
          stylist_experience : Number,
          stylist_dob : Date,
          stylist_emirates_id : Number
       }
     ]
  });

module.exports = mongoose.model('Salonschema', saloonSchema);