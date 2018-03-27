const mongoose = require("mongoose")

const api = {};

api.setup = (User) => (req, res) => {
    const admin = new User({
        username: 'admin',
        password: 'admin',
        clients: []
    })

    admin.save(err => {
        if (err) { throw err };
        console.log('Admin acct successfully created');

        res.json({ success: true, message: "Admint acct successfully set up!" })
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
    if (!req.body.username && req.body.password) {
        res.json({ success: false, message: "Missing username" })
    } else if (!req.body.password && req.body.username) {
        res.json({ success: false, message: "Missing password" })
    }
    else if (!req.body.username && !req.body.password) {
        res.json({ success: false, message: "Please pass both a username and a passowrd" })
    } else {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            clients: []
        })

        user.save((err) => {
            if (err) { return res.status(400).json({ success: false, message: "User already exists" }) }
            return res.status(400).json({ success: true, message: "User successfully created" })
        })
    }
}

module.exports = api;

