const user = require('../models/User');

const userCtrl = {};

userCtrl.getUsers = function(req, res){
    return res.status(200).send('test');
}

userCtrl.createUser = function(){

}

userCtrl.getUser = function(){

}

userCtrl.editUser = function(){

}

userCtrl.deleteUser = function(){

}

module.exports = userCtrl;