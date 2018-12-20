
'use strict';

const db = require('../models/saloonRequestRegistrationSchema');

exports.DeleteService = (obj) => {
return new Promise(async (resolve, reject) => {

var response=await db.find({"_id":obj.id});

var items = response[0];


items.services = items.services.filter((obj) => {

 return obj._id !=obj.serviceid;
});

console.log(items);


const DataSaved=await items.save()

return resolve({
    "res":DataSaved
})
});

}