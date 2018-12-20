'use strict';

const  db = require('../models/saloonRequestRegistrationSchema');

exports.addSalon = (obj) => {
    return new Promise(async (resolve, reject) => {

    const newuser =new db (
      obj=obj
    )

   const DataSaved=await newuser.save()
   console.log("DataSaved",DataSaved)
   
   
    })
}
