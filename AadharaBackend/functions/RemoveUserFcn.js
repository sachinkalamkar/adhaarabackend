'use strict';

const  db = require('../models/UserRegisterMdl');

exports.removeUser = (UserId) => {
    return new Promise(async (resolve, reject) => {

   const UserObj=await db.find({
        "_id":UserId
    });


   const DeleteObj=await db.findOneAndDelete(UserObj, (err, todo) => {  });

    console.log("user has been removed",DeleteObj);


    return resolve({
        "result":"object deleted"
    })
    })

   
}
