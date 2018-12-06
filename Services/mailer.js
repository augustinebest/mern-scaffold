var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: 'info.thefixers@gmail.com',
        pass: 'infothefixers1'
    }
});

exports.verify = function(id, email, callback){
    let mailOptions = {
        from: '"The Fixers"',
        to: email,
        subject: 'The Fixers Account Verification',
        html: `<center><h2> <p>Congratulations! Your account have been created and verify</p></h2><center>
                <br><br><h3><span style="color:rgba(4, 5, 17, 1); background-color:rgba(141, 173, 231, 1); padding: 20px; 
                border-radius: 20px; font-weight: bold; border-radius: 5px; border: 1px solid rgba(4, 5, 17, 1)">
                Please click on this link to generate your password
                <a href='http://thefixers-1.firebaseapp.com/auth/set-password?token=${id}&email=${email}'>Proceed to set password</a></span></h3>`
 };
 transporter.sendMail(mailOptions, callback);
}