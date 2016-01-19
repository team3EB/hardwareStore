/**
 * Created by alexadam on 19.01.16.
 */

var nodemailer = require('nodemailer');
var email;



module.exports=function(app){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'EBSmartSolutions@gmail.com',
            pass: 'WienAustria1'
        }
    });

    app.get('/emailtest/:email', function(req, res) {

        email = req.param.email;

        var mailOptions = {
            from: 'EBSmartSolutions <EBSmartSolutions@gmail.com>', // sender address
            to: req.params.email, // list of receivers
            subject: 'Thank you for your order!', // Subject line
            text: 'Thank you for your order!', // plaintext body
            html: '<b>Thank you for your order!</b>' // html body
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            res.json({ success: true });

        });
        res.json({ success: true });
    });




}