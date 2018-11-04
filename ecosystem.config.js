'use strict';

module.exports = {
    apps: [{
        name: 'Backend',
        script: 'index.js',
        env_production: {
            NODE_ENV: 'production'
        }
    }]
};