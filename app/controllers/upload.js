
/*
 * upload file controller.
 */
var crypto = require('crypto');
var http = require('http');
var path = require('path');

var AWS_ACCESS_KEY = "AKIAJKVK3WIQKKCEVFZQ";
var AWS_SECRET_KEY = "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";

exports.sign_s3 = function(req,res){
  if(req.isAuthenticated()){
    var object_name = req.query.s3_object_name;
    var extname = path.extname(object_name);
    if(req.query.s3_object_dest == "profile"){
      object_name = req.user.id + extname;
      var S3_BUCKET = "ehr-profile-photo";
    }
    else if(req.query.s3_object_dest == "mdfile"){
      object_name = req.user.id + "/" + object_name;
      var S3_BUCKET = "ehr-mdfile";
    }
    var mime_type = req.query.s3_object_type;
    var now = new Date();
    var expires = Math.ceil((now.getTime() + 30000)/1000); // 10 seconds from now
    var amz_headers = "x-amz-acl:public-read";

    var put_request = "PUT\n\n"+mime_type+"\n"+expires+"\n"+amz_headers+"\n/"+S3_BUCKET+"/"+object_name;

    var signature = crypto.createHmac('sha1', AWS_SECRET_KEY).update(put_request).digest('base64');
    signature = encodeURIComponent(signature.trim());
    //signature = signature.replace('%2B','+');

    var url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+object_name;

    var credentials = {
        signed_request: url+"?AWSAccessKeyId="+AWS_ACCESS_KEY+"&Expires="+expires+"&Signature="+signature,
        url: url
    };
    console.log(signature)
 //   	res.writeHead(200, {
 //    'Content-Type': 'text/plain',
 //    'Access-Control-Allow-Origin' : '*',
 //    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
	// });
  res.json(200,{
    url:url,
    AWS_ACCESS_KEY:AWS_ACCESS_KEY,
    expires:expires,
    signature:signature
  })
  }
  //   // res.write(JSON.stringify(credentials));
  //   // res.end();
  // }
  else{
    res.json(401, {message:"please log in"})
  }
}




