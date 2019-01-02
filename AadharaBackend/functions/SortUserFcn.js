"use strict";

const db = require("../models/UserRegisterMdl");

exports.sortUsers = () => {
  return new Promise(async (resolve, reject) => {
    const mysort = { name: 1 };
    var sortedData = await db.find().sort(mysort);
    console.log("sorted data", sortedData);
    resolve(sortedData);
  }).catch(errorMessage => {
    console.log(errorMessage);
  });
};
