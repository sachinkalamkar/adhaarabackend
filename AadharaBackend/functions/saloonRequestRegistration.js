'use strict';

const  db = require('../models/saloonRequestRegistrationSchema');
const nodemailer = require('nodemailer');

exports.RequestRegistration = (Request_Object) => {
  return new Promise(async (resolve, reject) => {
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'sachin.kalamkar@rapidqube.com',
          pass: 'svarrggk1@Home'
        }
      });

    console.log("check object "+Request_Object);
    const obj=new db(Request_Object);
    const objsave =  await obj.save()
      
        console.log(objsave.user_type);
        
            if(objsave.user_type == "salon"){
              transporter.sendMail({
                from: 'sachin.kalamkar@rapidqube.com',
                to: 'sachin.kalamkar@rapidqube.com',
                subject: 'Registration request',
                text: 'Hello Administrator,\n\nThis is request from "'+ objsave.name_of_salon + '" for registration.\n\nThanks and regards,\n'+objsave.name_of_salon+'.'
              }, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              })
            } else {
              var update_username_passwrd=await db.findOneAndUpdate({"_id":objsave._id}, {
                  $set : {
                    user_name : obj.email_of_salon,
                    status_of_registration : true,
                    password : Math.random().toString(36).slice(-8)
                  },
                },
                  {new:true}
                )
              
             
              console.log("get me a console",update_username_passwrd.user_name);
                await transporter.sendMail({
                  from: 'sachin.kalamkar@rapidqube.com',
                  to: objsave.email_of_salon,
                  subject: 'Registration confirmation',
                  text: 'Hello '+ objsave.name_of_salon + '\n\nYou are successfully registered.\n Your Username is : "' + update_username_passwrd.user_name + '"\nYour password is : "'+ update_username_passwrd.password + '"\n\nThanks and Regards,\n' + 'Adhaara.'
                }, function(error, info){
                    if (error) {
                      console.log(error);
                      } else {
                          console.log('Email sent: ' + info.response);
                        }
                    })   
          }
          return resolve({
                  "response":objsave
          }) 
        })
}