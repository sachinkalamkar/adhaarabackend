
'use strict';

const  db = require('../models/saloonRequestRegistrationSchema');

exports.editList = (id) => {
    return new Promise(async (resolve, reject) => {

    const editList=await db.findOne({"id":id});
            console.log("edit record",editList);

            return resolve({

                "message":"edit records"
              })
            //res.json(result);
        }
   
    )}
    
