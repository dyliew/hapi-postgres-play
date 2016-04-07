const Hapi = require('hapi');

const plugins = require('./Plugins');
const routes = require('./Routes');
const database = require('./database');

const server = new Hapi.Server();
server.connection({ port: 8080 });

plugins(server);
routes(server);

database.seedInitialData();

// start server
server.start((err) => {
    if (err)
        throw err;

    console.log(`Server running at: ${server.info.uri}`)
});