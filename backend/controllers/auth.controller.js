const User = require('../models/User');
const jwtCtrl = require('../controllers/jwt.controller');
const { authErrors } = require('../lib/errorMessages');
const authCtrl = {};

authCtrl.signin = async(req, res) => {
    let user = await User.findOne({email: req.body.email});

    if(!user) return res.status(400).send(authErrors.loginError);

    const validPassword = await user.checkPassword(req.body.password, user.password);
    if(!validPassword) return res.status(400).send(authErrors.loginError);

    const jwtToken = jwtCtrl.generateToken(user);

    res.status(201).header('Authorization', 'Bearer: ' + jwtToken).send();
    
};

module.exports =  authCtrl;
