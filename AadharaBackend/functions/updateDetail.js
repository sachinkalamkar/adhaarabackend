'use strict';

const db = require('../models/saloonRequestRegistrationSchema');


exports.updateDetail = (obj) => {
    return new Promise(async (resolve, reject) => {

  

   const salonObj=await db.find({

        $and: [{
            "type": type,
        }, 
        {
            "name": name
        }
        ]   
    });


    db.findOneAndDelete(salonObj._id, (err, todo) => {
        
        const DataSaved=newuser.save();
        
    });
    resolve("data has been updated");
    })
}
