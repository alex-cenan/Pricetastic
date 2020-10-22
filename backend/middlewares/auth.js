const jwtCtrl = require('../controllers/jwt.controller');
const errorMessages = require('../lib/errorMessages');

function auth(req,  res, next){
    let jwtToken = req.header('Authorization');
    if(!jwtToken) return res.status(401).send(errorMessages.roleErrors.unauthorized);

    // Split from ' ' to extract only the token. (Example: "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
    jwtToken = jwtToken.split(' ')[1]
    if(!jwtToken) return res.status(401).send(errorMessages.roleErrors.unauthorized)

    try{
        const payload = jwtCtrl.verifyToken(jwtToken);
        if(!payload) return res.status(401).send(errorMessages.authErrors.expiredToken);
        req.user = payload;
        next();
    }catch(err){
        return res.status(401).send(errorMessages.roleErrors.unauthorized);
    }
}

module.exports = auth;