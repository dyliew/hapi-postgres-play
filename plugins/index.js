const Good = require('good');
const inert = require('inert');
const glob = require('glob');
const config = require.main.require('./configurations');

module.exports = function(server){

    // logging
    server.register({
        register: Good,
        options: config.goodOptions
    }, handlePluginLoadingError);

    // serving static files
    server.register(inert, handlePluginLoadingError);

    registerLocalPlugins(server);
};

function registerLocalPlugins(server){
    glob.sync("./**/*.js", Object.assign({ cwd: './plugins' }, config.globOptions))
        .forEach(function(file){
            var moduleName = file.slice(0, file.length - 3);
            server.register(require(moduleName), handlePluginLoadingError);
        });
}

function handlePluginLoadingError(err){
    if (err){
        console.error(err);
        throw err;
    }
}