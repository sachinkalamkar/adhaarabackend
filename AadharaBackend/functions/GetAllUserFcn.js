"use strict";

const db = require("../models/UserRegisterMdl");

exports.getDetail = () => {
  return new Promise(async (resolve, reject) => {
    const userDetails = await db.find();
    console.log("User details", userDetails);
    resolve(userDetails);
  });
};


