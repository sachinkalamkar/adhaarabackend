
'use strict';
const updateDetail = require('./functions/updateDetail');
const removeItem = require('./functions/removeItem');
const getLists=require('./functions/getList');
const editList=require('./functions/edit');
const saloonRequestRegistrationSchema = require('./models/saloonRequestRegistrationSchema');
const registerUser = require('./functions/RegisterUserFcn');
const removeUser = require('./functions/RemoveUserFcn');
const updateUser = require('./functions/UpdateUserFcn');
const viewUser = require('./functions/GetAllUserFcn');

const saloonRequestRegistration=require('./functions/saloonRequestRegistration')
const cors = require('cors');
const md5 = require('md5');
const url = require('url');
const queryString = require('querystring');
const isEmpty = require('is-empty');
const nodemailer=require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'sachin.kalamkar@rapidqube.com',
      pass: 'svarrggk1@Home' 
    }
  });
module.exports = router => {
  
router.get('/', (req, res) => {

    res.send("Adhaara")
});


// List of all registered saloons

router.post('/listOfSalons', async(req, res) => {
    const registeredSalonList = await saloonRequestRegistrationSchema.find({
        status_of_registration : true,
    })
    const salonListLength = registeredSalonList.length;
    var registeredSalon = new Array();
    for(var i = 0; i < salonListLength; i++){
        if(registeredSalonList[i].request_status == false && registeredSalonList[i].status_of_registration == true){
            registeredSalon.push(registeredSalonList[i]);
        }
    }
    res.send(registeredSalon);
})

// Rejected salon list 

router.post('/rejectedSalons', async(req, res) => {
    const rejectedSalonList = await saloonRequestRegistrationSchema.find({
        request_status : false
    })
    const salonListLength = rejectedSalonList.length;
    var rejectedSalon = new Array();
    for(var i = 0; i < salonListLength; i++){
        if(rejectedSalonList[i].request_status == false){
            rejectedSalon.push(rejectedSalonList[i]);
        }
    }
    res.send(rejectedSalon);
})
// get salon details

router.post('/salonDetail', async(req, res) => {

    const salonId = req.body._id;
    const salonDetails = await saloonRequestRegistrationSchema.find({
        _id : salonId,
    })

    res.send(salonDetails[0]);
})
// Edit Stylist

 router.post('/editStylist', async(req, res) => {

    const salonId = req.body._id;
    const stylistId = req.body.salonid;
    const stylist_first_name = req.body.stylist_first_name;
    const stylist_last_name = req.body.stylist_last_name;
    console.log(stylist_first_name);
    console.log(stylist_last_name);

    const findSalon = await saloonRequestRegistrationSchema.find({
        "_id" : salonId,
    })
    const no_of_results = findSalon[0].stylist_details.length;
    for(var i = 0; i < no_of_results; i++){
            if(findSalon[0].stylist_details[i]._id == stylistId){
                findSalon[0].stylist_details[i].stylist_first_name = stylist_first_name;
                findSalon[0].stylist_details[i].stylist_last_name = stylist_last_name;
            }
    }
})


// Add stylist

router.post('/addStylist', async(req, res) => {

    const salonId = req.body._id;
    const stylist_first_name = req.body.stylist_first_name;
    const stylist_last_name = req.body.stylist_last_name;
    console.log(stylist_first_name);
    console.log(stylist_last_name);

    const findStylist = await saloonRequestRegistrationSchema.findOneAndUpdate({"_id" : salonId}, {
        $push : {
            stylist_details : [{
                stylist_first_name : stylist_first_name,
                stylist_last_name : stylist_last_name
            }]
        }
    }, { new : true },)
    .then( (findStylist) => res.send(findStylist) )
})

// Delete stylist 

router.post('/removeStylist', async(req, res) => {

    const salonId = req.body._id;
    const stylistId = req.body.salon_id;

    const getSalon = await saloonRequestRegistrationSchema.findOneAndUpdate({"_id": salonId},{
       $pull : {
           "stylist_details" : {
               _id : stylistId
           }
       }
    })
    .then( () => res.send("Stylist removed successfully") );
})
// Unregistered salon list

router.post('/getUnregisteredSaloons', async (req, res) => {

    const unregisteredSalonList = await saloonRequestRegistrationSchema.find({
        status_of_registration : false,
       // request_status : true
    })
   // res.send(unregisteredSalonList[0]);
    const salonListLength = unregisteredSalonList.length;
    var salonList = new Array();
    for(var i = 0; i < salonListLength; i++){
        if(unregisteredSalonList[i].request_status == true){
            salonList.push(unregisteredSalonList[i]);
        }
    }
    res.send(salonList);
})

//Login Salon webservice

router.post('/salonlogin', async (req, res) => {

    const salonUserName = req.body.user_name;
    const salonPassword = md5(req.body.password);
    //const user_id = req.body._id;

    const objlogin = await saloonRequestRegistrationSchema.find(
        {
            user_name : salonUserName,
            password : salonPassword
        }
    );
    if(salonUserName == objlogin[0].user_name && salonPassword == objlogin[0].password){
        res.send({
            
            "message":"Login Success",
            "id":objlogin[0]._id
        
        });
    } else {
        res.send("Username or Password is not matching");
    }
})

// Accept salon registration request

router.post('/requestResponse', async (req, res) => {
    const salonId = req.body._id;
    const resp = await saloonRequestRegistrationSchema.find({
        _id : salonId,
    })

    
    const sendResponse = await saloonRequestRegistrationSchema.findOneAndUpdate({_id : resp[0]._id}, {
       $set : {
            user_name : resp[0].email_of_salon,
            status_of_registration : true,
            password : Math.random().toString(36).slice(-8)
       },
    },{ new : true },) 


    await transporter.sendMail({
        from: 'sachin.kalamkar@rapidqube.com',
        to: sendResponse.email_of_salon,
        subject: 'Registration confirmation',
        text: 'Hello '+ sendResponse.name_of_salon + '\n\nYou are successfully registered.\n Your Username is : "' + sendResponse.user_name + '"\nYour password is : "'+ sendResponse.password + '"\n\nThanks and Regards,\n' + 'Adhaara.'
      }, function(error, info){
          if (error) {
            console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
              }
          })
    
 })

// Reject salon registration request

router.post('/rejectRequest', async (req, res) => {

    const salonId = req.body._id;
    const findSalon = await saloonRequestRegistrationSchema.findOneAndUpdate({"_id" : salonId}, {
        $set: {
            request_status : false
        }
    }, {new:true})
    const salon = findSalon.email_of_salon;
    const salonName = findSalon.name_of_salon;
    res.send({
        "result" : salon
    })
    
    transporter.sendMail({
        from: 'sachin.kalamkar@rapidqube.com',
        to: salon,
        subject: 'Registration request rejected',
        text: 'Hello '+salonName+',\n\nYour registration request is rejected by Adhaara administrator.\n\nThanks and regards,\n'+salonName+'.'
      }, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
})


//Registration request from salon


router.post('/request', async(req, res) => {
    //req.body
    console.log("data saved ",req.body);
    saloonRequestRegistration.RequestRegistration(req.body)
    .then((result)=>{
        res.send({
            "result":result.response
        })
    })  
})
//Render Reset password page
router.get('/setResetPassword',(req, res)=>{
   
    res.sendFile('/home/kheteshr/Downloads/AadharaBackend/index.html')
})

// Forgot password  
  router.post('/forgotPassword', async(req, res) => {
          const salonEmail = req.body.email_of_salon;
          const checkSalon = await saloonRequestRegistrationSchema.find({
              email_of_salon : salonEmail,
          });
          if(isEmpty(checkSalon)){
              res.send({"message":"Please enter registered salon email address."});
          }
          else{
              const salonEmail = checkSalon[0].email_of_salon;
              const salonId = checkSalon[0]._id;
              const salonName = checkSalon[0].name_of_salon;
              const checkSalonUpdate = await saloonRequestRegistrationSchema.findOneAndUpdate({"_id" : salonId},{
                  $set : {
                    set_password_id : Math.random().toString(36).slice(-8)
                  }
              }, {new : true},)
  
  
              transporter.sendMail({
                  from: 'sachin.kalamkar@rapidqube.com',
                  to: salonEmail,
                  subject: 'Password reset link',
                  text: 'Hello ' + salonName +',\n\nPlease, click on following link to reset your password.\nhttp://localhost:4003/setResetPassword?_id=' + salonId +"&temp_id="+checkSalonUpdate.set_password_id+" \n\nThanks and Regards\nAdhaara Team",
                }, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                    res.send({
                    "message":"we have sent reset link on your registered email id"
                    })
                  }
                 
                })
               
          }
  })
  

//reset password

router.post('/setResetPassword', async(req, res) => {
    console.log(req.body);
    const salonId = req.body._id;
    console.log(salonId);
    const tempId = req.body.temp_id;
    const password = md5(req.body.password);
    console.log(salonId);
    console.log(password);

    const checkTemp = await saloonRequestRegistrationSchema.find({
        _id : salonId
    });
    //console.log(checkTemp);
    const setPasswordId = checkTemp[0].set_password_id;
    //console.log(setPasswordId);

    if(tempId == setPasswordId){

        const resetPassword = await saloonRequestRegistrationSchema.findOneAndUpdate({"_id": salonId},{
            $set : {
                password : password,
                set_password_id : null
            }
        }, {new : true},);
    
        res.send({"message":"Your pasword is successfully updated."});

    }

    else{

        res.send({"message":"This link is only for one time use."});

    }   

})



//register user
    router.post('/registerUser', cors(), (req, res) => { 

      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
	  const mobile = req.body.mobile;
	  const email = req.body.email;  // verification link should send on user email address pending
      const pwd = req.body.pwd;
               
            registerUser
                .register(req.body)
                .then(result => {
                    res.send({
                       "register_user": result
                    });
                })
                
    })

//====================== View number of users =============
router.get('/viewUser', cors(), (req, res) => { 
            
        viewUser
            .getDetail()
            .then(result => {

                res.send({
                    result : result,
                   "message": "users details displayed successfully",
                    "status": true
                });
            })
            
})
//====================== Remove Users =====================
router.post('/removeUser', cors(), (req, res) => { 
    const UserId=req.body.User_Id;
    console.log("UserId",UserId);
        removeUser
            .removeUser(UserId)
            .then(result => {
                res.send({
                   "message": result,
                });
            })
            
})

//======================== Update user ====================

router.post('/updateUser', cors(), (req, res) => { 

    const firstName = req.body.firstName;
    console.log(">>>>>>>>>>>>>>", firstName);
    const password = req.body.password;
    console.log(">>>>>>>>>>>>>", password);
          updateUser
              .updateDetail(firstName, password)
              .then(result => {
  
                  res.send({
                     "message": "user has been updated successfully",
                      "status": true
                  });
              })
              
  })

//...............Start Remove/Add/Delete Salon Services(by ST)...............................
        router.post('/removeItem', cors(), (req, res) => { 
            console.log("Id>>>>>>>>>.Dont know");
            let id =req.body.id;
            console.log("Id>>>>>>>>>.Dont know",id);
            removeItem.DeleteService(id)
            .then(result => {

                console.log("We have received that "+result);

                res.send({
                   "object": result,
                });
        });   
    });

    router.post('/edit', cors(), (req, res) =>{

        console.log("Id>>>>>>>>>.Dont know");
        const id = (req.body.id);
        console.log("Id>>>>>>>>>.", id);
        editList.editList(id).then(result => {

            console.log("We have received that "+result);

            res.send({
               "object": result.response
            });
        
      });
    });

    router.post('/updateDetail', cors(), (req, res) => { 

        console.log("UPDATE API CALLED");
        

 
           updateDetail
                .updateDetail(req.body)
                .then(result => {

                    console.log("data updated successfully  "+result);

                });
            });       
         


    router.get('/getList', cors(), (req, res) => { 


                getLists.getList()
                .then(result => {
                    
                    console.log("data fetched successfully  "+result);
                    res.json(result);
                });                    
            });

//.............................End.....................................
//.........................Start with Salon Services( webservice by GG)..............

// webservice for adding salon services
router.post('/addService', cors(), (req, res) => { 
    console.log("add Service is called");

    addService
    .addService(req.body)
    .then((result) => {
    res.send({
            "message":"success",
            "result":result.result
    })

  })
})

// webservice for edit in salon services
    router.post('/editService', cors(), (req, res) => { 
        console.log("UPDATE API CALLED");
    
        editService
            .editService(req.body)
            .then(result => {
                console.log("data edited successfully  "+result);
            });
        });       
     

// webservice for delete salon services
    router.post('/DeleteService', cors(), (req, res) => { 
    console.log("DELETE API CALLED");           
        DeleteService
            .DeleteService(req.body)
            .then(result => {
        
                console.log("data deleted successfully  "+result);
                res.send({
                 "result":result.res
                        })
            });
        });       

// ......................Salon Service End.......................
}

