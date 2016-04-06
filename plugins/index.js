const Good = require('good');
const goodConsole = require('good-console');
const goodFile = require('good-file');
const inert = require('inert');
const glob = require('glob');

module.exports = function(server){
    server.register({
        register: Good,
        options: goodOptions
    }, handlePluginLoadingError);

    server.register(inert, handlePluginLoadingError);

    glob("./**/*.js", globOptions, (err, files) => {
        if (err)
            throw err;

        files.forEach(function(file){
            var moduleName = file.slice(0, file.length - 3);
            server.register(require(moduleName), handlePluginLoadingError);
        });
    });
};

const globOptions = {
    ignore: "./**/index*",
    cwd: "./plugins"
};

const goodOptions = {
    opsInterval: 5000,
    reporters: [{
        reporter: goodConsole,
        events: {
            error: "*",
            log: "*",
            request: "*",
            response: "*"
        },
        config: {
            format: 'DD-MM-YY/HHmmss.SSSS'
        }
    }, {
        reporter: goodFile,
        events: { error: '*' },
        config: {
            path: './logs',
            format: 'DD-MM-YYYY',
            prefix: 'good-file-error',
            rotate: 'daily'
        }
    }]
};

function handlePluginLoadingError(err){
    if (err){
        console.error(err);
        throw err;
    }
}