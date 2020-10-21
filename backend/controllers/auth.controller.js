const { Router } = require('express');
const User = require('../models/User');
const jwtCtrl = require('../controllers/jwt.controller');
const { authErrors } = require('../lib/errorMessages');
const role = require('../lib/role');
const authCtrl = {};
const headers = {
    authorization : 'Authorization',
    tokenType: 'Bearer: '
}

authCtrl.signup = async(req, res) => {
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send(authErrors.mailExists);

    // Create user object
    user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        // Default role is user
        role: role.user,
        password: req.body.password
    });

    // Password encryption
    user.password = await user.encryptPassword(user.password);
    
    // Saveing user
    try{
        const result = await user.save();
        const jwtToken = jwtCtrl.generateToken(result);

        return res.status(201).header(headers.authorization, headers.tokenType + jwtToken).send({"auth": true});
    }catch(err){
        return res.status(400).send({
            "error": true,
            "keyValue": err.keyValue,
            "keyPattern": err.keyPattern,
            "errors": err.errors
        });
    }
};

authCtrl.signin = async(req, res) => {
    let user = await User.findOne({email: req.body.email});

    if(!user) return res.status(400).send(authErrors.loginError);

    const validPassword = await user.checkPassword(req.body.password, user.password);
    if(!validPassword) return res.status(400).send(authErrors.loginError);

    const jwtToken = jwtCtrl.generateToken(user);

    res.status(201).header(headers.authorization, headers.tokenType + jwtToken).send({"auth": true});
    
};

module.exports =  authCtrl;
