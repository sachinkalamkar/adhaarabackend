'use strict';
const  db = require('../models/saloonRequestRegistrationSchema');
exports.editService = (obj) => {

return new Promise(async (req, res) => {

    console.log("object==========>>>",obj,obj.services);
   const _id = obj;

   console.log(_id);
const response=await db.find({
    _id: 'obj.services',
})

console.log(response[0]);
});


}


