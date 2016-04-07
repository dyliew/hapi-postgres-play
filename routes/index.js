const glob = require('glob');
const config = require.main.require('./configurations');

module.exports = function(server){

    server.route({
        method: 'GET',
        path: '/',
        config: { auth: false },
        handler: (req, rep) => rep({ message: "me Hapi true!" })
    });

    server.route({
        method: 'GET',
        path: '/refresh',
        handler: (req, rep) => rep({ message: "refreshed~" })
    });

    glob.sync("./**/*.js", Object.assign({ cwd: './routes' }, config.globOptions))
        .forEach(function(file){
            var moduleName = file.slice(0, file.length - 3);
            require(moduleName)(server);
        });
};