const glob = require('glob');
const config = require.main.require('./configurations');

module.exports = function(server){

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, rep) => {
            var message = {
                message: "My first Hapi!"
            };
            return rep(message)
        }
    });

    glob("./**/*.js", Object.assign({ cwd: './routes' }, config.globOptions), (err, files) => {
        if (err)
            throw err;

        files.forEach(function(file){
            var moduleName = file.slice(0, file.length - 3);
            require(moduleName)(server);
        });
    });
};