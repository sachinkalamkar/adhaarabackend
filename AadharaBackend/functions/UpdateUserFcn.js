"use strict";

const db = require("../models/UserRegisterMdl");

exports.updateDetail = (name, country, mobile, email, status) => {
  return new Promise(async (resolve, reject) => {
    const newuser = new db({
      name: name,
      country,
      mobile: mobile,
      email: email,
      status: status
    });

    const userObj = await db.find({
      _id : id
    });

    db.findOneAndDelete(uesrObj._id, (err, todo) => {
      const DataSaved = newuser.save();
    });
    resolve("data has been updated");
  });
};
