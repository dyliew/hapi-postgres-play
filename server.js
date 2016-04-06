const Hapi = require('hapi');

const loadPlugins = require('./Plugins');
const loadRoutes = require('./Routes');

const server = new Hapi.Server();
server.connection({ port: 8080 });

loadPlugins(server);
loadRoutes(server);

// start server
server.start((err) => {
    if (err)
        throw err;

    console.log(`'Server running at: ${server.info.uri}'`)
});