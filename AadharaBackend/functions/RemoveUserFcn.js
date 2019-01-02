"use strict";

const db = require("../models/UserRegisterMdl");

exports.removeUser = (id) => {
  console.log("user id from &&&&&&&&&&&&******", id);
  return new Promise(async (resolve, reject) => {
    const userObj = await db.find({
      "_id" : id
    });
console.log("user id from mongo???????????????", userObj);
if(userObj[0] != 0){
const removeUser = await db.findOneAndDelete({_id : id});
//console.log("user id from mongo 12", userObj._id);
console.log("show show show", removeUser);    
return resolve({
  "result":"User deleted"
});
}
else {
  console.log("No user exists")
}
  
  });
};
