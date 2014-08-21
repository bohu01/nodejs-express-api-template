//user model
var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var UserSchema = new Schema({
    lastname: {
        en: String,
        ch: String,
    },
    firstname: {
        en: String,
        ch: String,
    },
    username: String,
    email: String,
    password: String,
    admin: {type: Boolean, default: false},
    passwordRecovery : {
        token: { type:String, sparse:true },
        expires: Date
    },
});

//validation
// UserSchema.path('password').validate(function(password){
// 	return password.length > 0;

// }, 'Password can not be blank')


// UserSchema.method('forgotPasswordSendEmail', function(email,link,cb) {
//   if(!email || email.length == 0) {
//       cb(new Error("Please provide a valid e-mail address"));
//   } else {
//       User.findOne({email:email},function(err,user) {
//           if( err || !user ) {
//             cb(new Error("Unable to find e-mail address. Please make sure you entered your e-mail address correctly"));
//           } else {
//               var uuid = require('node-uuid')
//               var token = uuid.v4() + '-' + Date.now();
//               user.passwordRecovery.token=token;
//               user.passwordRecovery.expires = Date.now() + (24*60*60*1*1000); // 1 days
//               user.save();


//               var nodemailer = require('nodemailer');
//               var transport = nodemailer.createTransport("SMTP", {
//                 service: "Gmail",
//                 auth: {
//                   user: "sup.morehealth@gmail.com",
//                   pass: "morehealth"
//                 }
//               });

//               var mailOptions = {
//                     from: "More Health <sup.morehealth@gmail.com>" // sender address
//                   , to: user.email // list of receivers
//                   , subject: "Password Reset Request" // Subject line
//                   , text: "In order to reset your password, please open the following link in your browser: " + link + token 
//               }


//               transport.sendMail(mailOptions, function(error, response){
//                   if (error) {
//                       cb(new Error("Failed to send e-mail (" + error + ")"));
//                   } else {
//                       // all done...
//                       cb(null);
//                   }
//               });
//           }
//       });
//   }
// })

// UserSchema.method('resetPassword', function(token,cb) {
//     if(!token || token.length == 0) {
//         cb(new Error("Invalid password reset request (#9001). Please contact support."));
//     } else {
//         User.findOne({'passwordRecovery.token':token},function(err,user) {
//             if( err || !user ) {
//                 cb(new Error("Invalid password reset request (#9002). Please contact support."));
//             } else {
//                 cb(null,user);
//             }
//         });
//     }
// })


// UserSchema.method('resetPasswordProcess', function(token,password,cb) {
//     //console.log(password)
//     //console.log(token)
//     if(!token || token.length == 0) {
//         cb(new Error("Invalid password reset request (#9003). Please contact support."));
//     } else {
//         User.findOne({'passwordRecovery.token':token},function(err,user) {

//             if( err || !user ) {
//                 cb(new Error("Invalid password reset request (#9004). Please contact support."));
//             } else {
//                 //console.log(password)
//                 user.password = password;
//                 user.save(function(err){
//                   cb(err);
//                 })

//             }
//         });
//     }
// })


var User = mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);