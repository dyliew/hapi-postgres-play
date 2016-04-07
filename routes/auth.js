const jwt = require('jsonwebtoken');
const config = require.main.require('./configurations');

module.exports = function(server){
    server.route({
        method: 'POST',
        path: '/auth/login',
        config: { auth: false },
        handler: (req, rep) => {
            if (req.payload.username !== 'username' || req.payload.password !== 'password'){
                return rep({
                    message: 'Invalid username or password'
                });
            }

            var payload = {
                username: req.payload.username
            };

            var token = jwt.sign(payload, config.auth.jwtSecret, config.auth.jwtOptions);
            return rep({
                token,
                message: "Successful login"
            });
        }
    });
};