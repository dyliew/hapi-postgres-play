exports.register = function(server, options, next){
    // You can do all sort of things here with the server
    // such as added server.ext(...)
    server.route({
        method: 'GET',
        path: '/plugins/{name}',
        handler: (req, rep) => {
            var paramName = req.params.name || 'default';
            var result = {
                message: `My first Hapi plugin that goes ${paramName}`,
                paramName
            };
            return rep(result);
        }
    });

    next();
};

exports.register.attributes = {
    name: 'myFirstPlugin',
    version: '0.0.0'
};