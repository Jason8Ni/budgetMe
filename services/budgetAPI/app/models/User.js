const mongoose = require('mongoose'),
    bcrypt = require('bcrypt')

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
    passwordConf: {
        type: String,
        required: true,
    },
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


mongoose.model('User', Schema);