const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.apiKey,
    api_secret: process.env.apiSecret
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