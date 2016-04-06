exports.register = function(server, options, next){
    server.route({
        method: 'GET',
        path: '/first-plugins',
        handler: (req, rep) => {
            return rep('My first Hapi plugin')
        }
    });

    next();
};

exports.register.attributes = {
    name: 'myFirstPlugin',
    version: '0.0.0'
};