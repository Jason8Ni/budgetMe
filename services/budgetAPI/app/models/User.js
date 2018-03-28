const mongoose = require('mongoose'),
    bcrypt = require('bcrypt')

const Schema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    clients:[{}]
});

Schema.pre('save', function(next) {
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

    Schema.methods.checkPass = (pass, cb) => {
        bcrypt.compare(password, this.password, (err, match) => {
            if (err) { return cb(err) };
            cb(null, match);

        });
    }

});
mongoose.model('User', Schema);