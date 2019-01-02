'use strict';
const  db = require('../models/saloonRequestRegistrationSchema');
exports.addService = (obj) => {

return new Promise(async (req, res) => {

    console.log("object==========>>>",obj);
   const _id = obj;

const response=await db.findOneAndUpdate({"_id":_id},   {
                                   $push:{ 
                             
                                       "services":obj.services
                                    }
                                }, { new: true},)

console.log("response",response);
});
}