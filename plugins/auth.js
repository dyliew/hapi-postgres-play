const hapiAuthJwt2 = require('hapi-auth-jwt2');
const config = require.main.require('./configurations');
const jwt = require('jsonwebtoken');

exports.register = function(server, options, next){
    server.register(hapiAuthJwt2, (err) => {
        if (err){
            console.error(err);
            throw err;
        }

        server.auth.strategy('jwt', 'jwt', {
            key: config.auth.jwtSecret,
            validateFunc: (decoded, request, callback) => {
                if (decoded.username !== 'username')
                    return callback(null, false);

                return callback(null, true, {
                    username: decoded.username
                });
            }, verifyOptions: {
                issuer: config.auth.jwtOptions.issuer,
                audience: config.auth.jwtOptions.audience
            }
        });

        server.auth.default('jwt');

        server.ext('onPreResponse', function(req, rep){
            // resend a token on every response to update token expiration
            if (!req.auth.isAuthenticated)
                return rep.continue();

            var payload = {
                username: req.auth.credentials.username
            };

            var token = jwt.sign(payload, config.auth.jwtSecret, {
                expiresIn: '3h',
                audience: 'audience',
                issuer: 'issuer'
            });

            Object.assign(req.response.source, { token });

            return rep.continue();
        });
    });

    next();
};

exports.register.attributes = {
    name: 'myAuthPlugin',
    version: '0.0.0'
};