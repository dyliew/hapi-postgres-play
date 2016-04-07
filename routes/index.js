const glob = require('glob');
const config = require.main.require('./configurations');

module.exports = function(server){

    server.route({
        method: 'GET',
        path: '/',
        config: { auth: false },
        handler: (req, rep) => {
            var message = {
                message: "My first Hapi!"
            };
            return rep(message)
        }
    });

    glob.sync("./**/*.js", Object.assign({ cwd: './routes' }, config.globOptions))
        .forEach(function(file){
            var moduleName = file.slice(0, file.length - 3);
            require(moduleName)(server);
        });
};