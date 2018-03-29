const mongoose = require("mongoose")

const api = {};

api.setup = (User) => (req, res) => {
    const admin = new User({
        //Only used during development... Will remove once app is built...
        username: 'admin',
        password: 'admin',
        clients: []
    })

    admin.save(err => {
        if (err) { throw err };
        console.log('Admin acct successfully created');

        res.json({ success: true, message: "Admin acct successfully set up!" })
    })


};

api.index = (User, token) => (req, res) => {
    if (token) {
        User.find({}, (err, users) => {
            if (err) { throw err };
            res.status(200).json(users);
        });
    } else {
        return res.status(403).send({ success: false, message: "You are not authorized to view this" })
    }
}

api.signup = (User) => (req, res) => {
    if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
        if (req.body.password === req.body.passwordConf) {
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                clients: []
            })
            console.log(1234);
            user.save((err) => {
                //console.log('***' + err);
                if (err) { res.status(400).send({ success: false, message: "User already exists" }) }
                else {
                    res.json({ success: true, message: "User successfully created" })
                }
            })
        } else {
            res.json({ success: false, message: "Passwords are not equal" })
        }

    } else {
        res.json({ success: false, message: "Please make sure all required fields are filled in" })
    }

}

module.exports = api;

