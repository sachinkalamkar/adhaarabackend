"user strict";

var db = require("../models/UserRegisterMdl");

exports.filterUsers = (name, country, mobile, email, status) => {
  console.log("user1 >>>>>>>>>>>>>>", name, country, mobile, email, status);
  
  return new Promise(async (resolve, reject) => {
    var filteredData = await db.find({$or: [{"name": name},
      {"country": country},
      {"mobile": mobile},
      {"email": email},
      {"status": status}
    ]})

    console.log("filtered Data >>>>>>>", filteredData);
    if(filteredData.length > 0) {
    resolve(filteredData);
  }
  else {
    reject("no user exixts");
    console.log("No users exists")
  }
  }).catch(errorMessage => {
    console.log("Hey you got error>>>>>>", errorMessage);
  });
};




/**
 * .aggregate([
      {
        $match: {
          $or: [
            {
              name: "name"
            },
            {
              country: "country"
            },
            {
              mobile: "mobile"
            },
            {
              email : "email"
            }
          ]
        }
      }
    ])
  
 */