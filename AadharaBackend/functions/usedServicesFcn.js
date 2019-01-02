"user strict";

var db = require("../models/UserRegisterMdl");
var count = 0;
exports.usedServices = (customer_id, category, name, price) => { 
    console.log("user used service$$$$$$$$$$$$$",customer_id, category, name, price);

    return new Promise(async (resolve, reject) => {

    if(customer_id !== 0){
        count = count + 1;
        console.log(count)


        const serviceCount = await db.findOneAndUpdate({"customer_id" : customer_id}, {
            $push : {
                services : [
                    {

                    servic_category : category,
                    service_name : name,
                    count : count,
                    price : price

                    }
            ]
            }
        }, { new : true },)

        resolve(serviceCount);

    } else {
        console.log("please enter valid category and name");
        reject("no count");
    }
 
      }).catch(errorMessage => {
        console.log("Hey you got error>>>>>>", errorMessage);
      });
}

