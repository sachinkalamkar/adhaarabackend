"use strict";

const db = require("../models/productRegisterMdl");


exports.register = (
  id,
  name,
  price,
  category_id,
  category_name

) => {
  return new Promise(async (resolve, reject) => {
    const newuser = new db({
      id: id,
      name: name,
      price: price,
      category_id: category_id,
      category_name: category_name,

    });

    const userDetails = await newuser.save();
    console.log("DataSaved", userDetails);
    resolve(userDetails);
  }).catch(errorMessage => {
    // This avoids a little cofusion in promise hell
    console.log(errorMessage);
  });
};
