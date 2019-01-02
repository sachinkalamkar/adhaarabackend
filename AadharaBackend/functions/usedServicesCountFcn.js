"user strict";

var db = require("../models/UserRegisterMdl");

exports.usedServicesCount = (id) => { 

  console.log("user id from &&&&&&&&&&&&******", id);

  return new Promise(async (resolve, reject) => {
    const userObj = await db.find({
      "_id" : id
    })

console.log("user id from mongo???????????????", userObj);
if(userObj[0] != 0){
console.log("show show show", userObj);  
  
let userCount = userObj[0].services[0];   
console.log("???????????/",userCount);
return resolve(userObj);
}
else {
  console.log("No user exists")
}
  
}).catch(errorMessage => {
    console.log("Hey you got error>>>>>>", errorMessage);
  });
};



    
