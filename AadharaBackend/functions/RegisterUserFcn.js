"use strict";

const db = require("../models/UserRegisterMdl");


exports.register = (
  customer_id,
  name,
  country,
  mobile,
  email,
  status

) => {
  return new Promise(async (resolve, reject) => {
    const newuser = new db({
      customer_id: customer_id,
      name: name,
      country,
      mobile: mobile,
      email: email,
      status: status

    });

    const userDetails = await newuser.save();
    console.log("DataSaved", userDetails);
    resolve(userDetails);
  }).catch(errorMessage => {
    // This avoids a little cofusion in promise hell
    console.log(errorMessage);
  });
};
