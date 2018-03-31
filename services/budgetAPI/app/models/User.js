const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    config = require("@config"),
    nodemailer = require('nodemailer'),
    email = require('emailjs'),
    emailServer = email.server.connect({
        host: 'smtp.gmail.com',
        ssl: true,
        user: config.email,
        password: config.emailPass,
    });

const Schema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //don't think I need this part but will figure out later....
    passwordConf: {
        type: String
    },
    resetPasswordToken: String,
    resetPasswordExpireDate: Date,
    clients: [{}]
});

Schema.pre('save', function (next) {
    const user = this;

    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) { return next(err); }

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) { return next(err); }

                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

Schema.methods.checkPass = function (pass, cb) {
    bcrypt.compare(pass, this.password, (err, match) => {
        if (err) { return cb(err) };
        cb(null, match);

    });
}

Schema.methods.genResetPassToken = function (cb) {
    crypto.randomBytes(config.byteNum, (err, buf) => {
        var token = buf.toString('hex');
        cb(err, token);
    })
}

//may change to ue google smtp...
//https://stackoverflow.com/questions/17055983/how-do-i-send-email-from-my-gmail-account-in-my-node-js-script
//
Schema.methods.sendResetEmail = function (url, user, cb) {
    var mailOptions = {
        to: user.email,
        from: 'jason8ni@hotmail.com',
        subject: 'Node.js Password Reset',
        text:
            'Please click on the following link, to reset your password:\n\n' +
            token + '\n\n' +
            'If you did not initiate this, please ignore this email.\n'
    };

    var message = emailjs.message.create(mailOptions);
    emailServer.send(message, (err, msg) => {
        console.log(err);
        console.log(msg);
        cb(err, 'done')
    })
}

Schema.methods.sendNewPassEmail = function (user, cb) {
    var mailOptions = {
        to: user.email,
        from: 'jason8ni@hotmail.com',
        subject: 'Node.js Password Successfully changed',
        text: 'Hello,\n\n' +
            'This is a confirmation that your password for' + user.username + ' has been successfully changed.\n'
    };

    var message = emailjs.message.create(mailOptions);
    emailServer.send(message, (err, msg) => {
        console.log(err);
        console.log(msg);
        cb(err, 'done')
    })
}


mongoose.model('User', Schema);