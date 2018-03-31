const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    config = require("@config"),
    nodemailer = require('nodemailer');

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
Schema.methods.sendResetEmail = function (token, user, cb) {
    var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
            user: config.smtpUser,
            pass: config.smtpPass
        }
    });
    var mailOptions = {
        to: user.email,
        from: 'jason8ni@hotmail.com',
        subject: 'Node.js Password Reset',
        text: 
            'Please click on the following link, to reset your password:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not initiate this, please ignore this email.\n'
    };
    smtpTransport.sendMail(mailOptions, function (err) {
        cb(err, 'done');
    });
}


mongoose.model('User', Schema);