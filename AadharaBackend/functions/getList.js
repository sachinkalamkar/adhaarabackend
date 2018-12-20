'use strict';

const  db = require('../models/saloonRequestRegistrationSchema');

exports.getList = () => {
    return new Promise(async (resolve, reject) => {

        const dataList = await db.find()
           
          console.log(dataList.id);
        resolve(dataList);
    });
}