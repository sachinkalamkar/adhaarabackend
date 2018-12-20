'use strict';

const  db = require('../models/UserRegisterMdl');

exports.register = (obj) => {
    return new Promise(async (resolve, reject) => {

    const newuser =new db (obj);
    const userDetails = await newuser.save();
    console.log("DataSaved", userDetails); 
    return resolve({
        "result":userDetails
    })
    
    })
}
