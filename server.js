const Hapi = require('hapi');
const loadPlugins = require('./Plugins');

const server = new Hapi.Server();
server.connection({ port: 8080 });

loadPlugins(server);

// routes
server.route({
    method: 'GET',
    path: '/',
    handler: (req, rep) => {
        return rep('My first Hapi')
    }
});

// start server
server.start((err) => {
    if (err)
        throw err;

    console.log(`'Server running at: ${server.info.uri}'`)
});