const cloudinary = require('cloudinary');
const keys = require('../config/keys');

cloudinary.config({
    cloud_name: keys.cloudinary.cloudName,
    api_key: keys.cloudinary.apiKey,
    api_secret: keys.cloudinary.apiSecret
  })

// Upload to cloudinary
exports.upload = function(file){
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, function(result){
            resolve({url: result.url, Id: result.public_id});
        }, {resource_type: "auto"})
   })
}

// Delete from cloudinary
exports.delete = function(publicId) {
    cloudinary.uploader.destroy(publicId, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            console.log('It have been deleted in cloudinary!');
        }
    })
}