const goodConsole = require('good-console');
const goodFile = require('good-file');

module.exports = {
    globOptions: {
        ignore: "./**/index*"
    },
    goodOptions: {
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
    },
    auth: {
        jwtSecret: "secret",
        jwtOptions: {
            issuer: "issuer",
            audience: "audience",
            expireIn: '3h'
        }
    }
};