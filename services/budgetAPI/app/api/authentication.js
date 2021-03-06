const mongoose = require("mongoose"),
    jwt = require("jsonwebtoken"),
    config = require("@config")

const api = {};

api.login = (User) => (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        //console.log(req.body.username)
        if (err) throw error;
        if (!user) res.status(401).send({ success: false, message: "Failed to authenticate, the User was not found. Please try again" })
        else {
            // console.log(user)
            user.checkPass(req.body.password, (err, match) => {
                if (match && !err) {
                    const token = jwt.sign({ user }, config.secret);
                    res.json({ success: true, message: "User authenticated", token });
                } else {
                    res.status(401).send({ success: false, message: "Failed to authenticated, the password was incorrect." })
                }
            })
        }

    })
}

api.verify = (headers) => {
    if (headers && headers.authorization) {
        const split = headers.authorization.split(' ');
        if (split.length === 2) return split[1];
        else return null;
    } else return null;
}

api.resetPassToken = (User) => (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            res.status(401).send({ success: false, message: "No account with that email address was found, please try again." })
        }

        user.genResetPassToken((err, token) => {
            if (!token) {
                res.status(401).send({ success: false, message: "Token was not generated" });
            }
            user.resetPasswordToken = token;
            user.resetPasswordExpireDate = Date.now() + 3600000; //1 hr

            user.save((err) => {
                if (err) { res.status(400).json({ success: false, message: "Token not saved" }) }
            })

        });
        var url = 'http://' + req.headers.host + '/reset/' + token;

        User.sendResetEmail(url, user, (err, msg, result) => {
            if (err) {
                res.status(400).json({ success: false, message: "Message failed to send. The msg associated with the error is: " + msg })
            }

            res.json({ success: true, message: "Password reset" })
        })
    })


}

// should figure out pathing for each of the pages/ how to create a pipeline of page requests, 
// e.g. reset page to redirect to home page etc...
// done thru routers page.
//connection to front end too...
//http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
api.resetPass = (User) => (req, res) => {

    User.findOne({ resetPasswordToken: req.body.token }, (err, user) => {
        if (!user) {
            res.status(400).send({ success: false, message: "Token is invalid." });
        }

        if (Date.now() >= user.resetPasswordExpireDate) {
            res.status(400).send({ success: false, message: "Token is expired." });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpireDate = undefined;

        user.save((err) => {
            //console.log('***' + err);
            if (err) { res.status(400).send({ success: false, message: "Password not reset" }) }
        })

        User.sendResetEmail(user, (err, msg, result) => {
            if (err) {
                res.status(400).json({ success: false, message: "Message failed to send. The msg associated with the error is: " + msg })
            }

            res.json({ success: true, message: "Password reset" })
        })
    })

}


//Have to implement this section... Figure out how to structure these methods...
//One get method used to load/verify if the token is right
// while another one used in a post call will actually change the password 
/*
app.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
          }
  
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
  
          user.save(function(err) {
            req.logIn(user, function(err) {
              done(err, user);
            });
          });
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport('SMTP', {
          service: 'SendGrid',
          auth: {
            user: '!!! YOUR SENDGRID USERNAME !!!',
            pass: '!!! YOUR SENDGRID PASSWORD !!!'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'passwordreset@demo.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/');
    });
  });
*/
module.exports = api;