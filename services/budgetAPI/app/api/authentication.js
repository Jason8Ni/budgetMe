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

api.resetPass = (User) => (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            res.status(401).send({ success: false, message: "No account with that email address was found, please try again." })
        }

        user.genResetPassToken((err, token) => {
            if (!token) {
                res.status(401).send({ success: false, message: "Token was not generated" });
            }
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; //1 hr

            user.save((err) => {
                if (err) { res.status(400).json({ success: false, message: "Token not saved" }) }
            })

            user.sendResetEmail((err, result) => {
                if (err) {
                    res.status(400).json({ success: false, message: "Message failed to send" })
                }

                res.json({ success : true, message: "Password reset" })
            })

        }
        );
    })
}

module.exports = api;