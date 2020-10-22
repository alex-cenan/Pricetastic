const { roleErrors } = require('../lib/errorMessages');

function authorize(roles = []){
    if(typeof roles === 'string'){
        roles = [roles];
    }

    return[
        (req, res, next) => {
            // Check role
            if(!roles.includes(req.user.role)) return res.status(403).send(roleErrors.unauthorized);
            next();
        }
    ]
}

module.exports = authorize