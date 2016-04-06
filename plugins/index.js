const Good = require('good');
const inert = require('inert');
const glob = require('glob');
const config = require.main.require('./configurations');

module.exports = function(server){
    server.register({
        register: Good,
        options: config.goodOptions
    }, handlePluginLoadingError);

    server.register(inert, handlePluginLoadingError);

    glob("./**/*.js", Object.assign({ cwd: './plugins' }, config.globOptions), (err, files) => {
        if (err)
            throw err;

        files.forEach(function(file){
            var moduleName = file.slice(0, file.length - 3);
            server.register(require(moduleName), handlePluginLoadingError);
        });
    });
};

function handlePluginLoadingError(err){
    if (err){
        console.error(err);
        throw err;
    }
}