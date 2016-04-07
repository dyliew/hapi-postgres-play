const Boom = require('boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require.main.require('./configurations');
const db = require('../database/').instance;

module.exports = function(server){
    server.route({
        method: 'POST',
        path: '/auth/login',
        config: { auth: false },
        handler: (req, rep) => {
            db['app_user'].findDoc({ email: req.payload.email }, function(err, user){
                if (err)
                    return rep(Boom.badImplementation(err));

                if (!user)
                    return rep(Boom.notFound("Invalid username or password"));

                bcrypt.compare(req.payload.password, user[0].passwordHash, function(err, res){
                    if (err)
                        return rep(Boom.badImplementation(err));

                    if (!res)
                        return rep(Boom.notFound("Invalid username or password"));

                    var payload = { email: req.payload.email };

                    var token = jwt.sign(payload, config.auth.jwtSecret, config.auth.jwtOptions);

                    return rep({
                        token,
                        message: "Successful login"
                    });
                })
            });
        }
    });
};