const mongoose = require("mongoose")

const api = {};

api.createUser = (User) => (req, res) => {
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

api.index = (User, token) =>(res,req) =>{
    if(token) {
        User.find({}, (err, users)=>{
            if(err) {throw err};
            res.status(200).json(users);
        });
    } else {
        return res.status(403).send({success:false, message: "You are not authorized to view this"})
    }
}
}

