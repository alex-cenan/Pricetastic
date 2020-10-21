const jwt = require('jsonwebtoken');

const jwtCtrl = {}

jwtCtrl.generateToken = function(user){
    return jwt.sign({
            id: user._id,
            name: user.name,
            role: user.role
        }, process.env.SECRET_KEY_JWT_API, {
            // Expires in 1 week
            expiresIn: 60 * 60 * 167
        });
}

jwtCtrl.verifyToken = function(jwtToken){
    const payload = jwt.verify(jwtToken, process.env.SECRET_KEY_JWT_API);
    if (Date.now() <= payload.exp * 1000) {
        // Token expired
        return false;
    }
    return payload;
}

module.exports = jwtCtrl;