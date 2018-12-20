'use strict';

const  db = require('../models/UserRegisterMdl');

exports.getDetail = () => {
    return new Promise(async (resolve, reject) => {

        const salonObj=await db.find({});
        console.log("User details", salonObj);
        resolve(salonObj);
        
    });
}
