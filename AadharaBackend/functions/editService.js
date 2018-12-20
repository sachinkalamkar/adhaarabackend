'use strict';

const  db = require('../models/saloonRequestRegistrationSchema');

exports.editService = (obj) => {
return new Promise(async (resolve, reject) => {

    console.log("object==========>>>",obj);
   
const response=await db.findOneAndUpdate({"_id":obj.id}, {$set:{ services:obj.services}}, {
    new: true
});

console.log("response",response);


return resolve({
    "response":response
})

});

}