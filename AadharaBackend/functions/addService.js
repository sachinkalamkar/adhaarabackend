
'use strict';

const  db = require('../models/saloonRequestRegistrationSchema');

exports.addService = (obj) => {
console.log("check object",obj);
return new Promise(async (resolve, reject) => {

const newuser =new db.findOneAndUpdate({"_id":obj.id},{
   "ServiceCategory":obj.ServicCategory,
   "Services":obj.serviceCategory
})

const DataSaved=await newuser.save()
console.log("DataSaved",DataSaved)

return resolve({
    "result":DataSaved
})
});
}