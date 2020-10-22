const User = require('../models/User');
const errors = require('../lib/errorMessages');
const role = require('../lib/role');
const jwtCtrl = require('../controllers/jwt.controller');

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    if(!users) return res.status(400).send({'msg': errors.userErrors.noRegisteredUsers});

    res.status(200).send(users);
}

userCtrl.createUser = async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send({'msg': errors.userErrors.mailExists});

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
        console.log(jwtToken);

        return res.status(200).header('Authorization', 'Bearer: ' + jwtToken).send(result);
    }catch(err){
        console.log(err);
        return res.status(400).send({
            "error": true,
            "keyValue": err.keyValue,
            "keyPattern": err.keyPattern,
            "errors": err.errors
        });
    }
}

userCtrl.getUser = async (req, res) => {
    if(req.user.role != role.admin){
        if(req.params.id != req.user.id) return res.status(400).send(errors.roleErrors.unauthorized);
    }

    let user = await User.findById(req.params.id);
    if(!user) return res.status(404).send({'msg': errors.userErrors.notFound});

    return res.status(200).send(user);
}

userCtrl.editUser = async (req, res) => {
    let newRole = role.user;

    if(req.user.role != role.admin){
        if(req.params.id != req.user.id) return res.status(400).send(errors.roleErrors.unauthorized);
    }

    if(req.user.role === role.admin && req.body.role){
        newRole = req.body.role;
        console.log(newRole);
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone,
        // Default role is user
        role: newRole,
    },{
        new: true
    });

    if(!user){
        return res.status(404).send(errors.userErrors.notFound);
    }

    res.status(200).send();
}

userCtrl.deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
        return res.status(404).send(errors.userErrors.notFound);
    }

    res.status(200).send();
}

module.exports = userCtrl;