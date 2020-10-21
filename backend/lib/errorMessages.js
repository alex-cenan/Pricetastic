module.exports = {
    authErrors: {
        loginError: {
            auth: 'false',
            msg: 'Usuario o contraseña incorrectos.'
        },
        mailExists:  {
            error: 'mailExists',
            msg: 'El email ya está registrado.'
        },
        unauthorized: {
            error: 'unauthorized',
            msg: 'Acceso denegado.'
        },
        expiredToken: {
            error: 'expiredToken',
            msg: 'El token ha caducado.'
        }
    }
}