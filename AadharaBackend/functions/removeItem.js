'use strict';

const  db = require('../models/saloonRequestRegistrationSchema');

exports.DeleteService = (id) => {
  console.log("id in ffunction",id);
return new Promise(async (resolve, reject) => {

const deleteObject=await db.findOneAndRemove(
   {"_id": id});

console.log("deleted object",deleteObject);


return resolve({
  "message":"deleted succesfully"
})
});
}