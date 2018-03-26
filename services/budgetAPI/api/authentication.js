const mongoose = require("mongoose"),
    jwt = require("jsonwebtoken"),
    config = require("@config")

const api = {};

api.login = (User) =>(res,req)=> {
    User.findOne({username: req.body.username}, (err, user)=> {
        if(err) throw error;
        if(!user) res.status(401).send({success: false, message:"Failed to authenticate, the User was not found. Please try again"})
        else {
            user.comparePassword(req.body.password, (err, match) =>
        {
            if(match && !err) {
                const token = jwt.sign({user}, config.secret);
                res.json({success:true, message: "User authenticated", token});
            } else{
                res.status(401).send({success:false, massage:"Failed to authenticated, the password was incorrect."})
            }
        })
        }

    })
}