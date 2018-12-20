'use strict';

const  db = require('../models/UserRegisterMdl');

exports.updateDetail = (firstName, lastName, mobile, email, pwd, refCode)  => {
    return new Promise(async (resolve, reject) => {

        const newuser =new db ({
            firstName : firstName,
            lastName : lastName,
            mobile : mobile,
            email : email,
            pwd : pwd,
            refCode : refCode
            
       });
   const salonObj=await db.find({

        $and: [{
            "firstName": firstName,
        }, 
        {
            "mobile": mobile
        }
        ]   
    });


    db.findOneAndDelete(salonObj._id, (err, todo) => {
        
        const DataSaved = newuser.save();
        
    });
    resolve("data has been updated");
    })
}
