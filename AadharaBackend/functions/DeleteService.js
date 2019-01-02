'use strict';
const  db = require('../models/saloonRequestRegistrationSchema');

exports.DeleteService = (obj) => {
return new Promise(async (resolve, reject) => {
    const _id = obj;
    const services = _id.services;
var response=await db.find({"_id":_id});

var items = response[0];


items.services = items.services.filter((obj) => {

 return obj._id !=services;
});

console.log(items);


const DataSaved=await items.save()

});

}