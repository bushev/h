'use strict';

module.exports = {
    apps: [{
        name: 'Backend',
        script: 'index.js',
        env_production: {
            NODE_ENV: 'production'
        }
    }],
    deploy: {
        production: {
            key: '/Users/bushev/.ssh/h',
            user: 'root',
            host: '176.112.204.146',
            repo: 'git@github.com:bushev/h.git',
            path: '/root/h',
            ref: 'origin/master',
            'post-deploy': 'npm i && pm2 startOrGracefulReload ecosystem.config.js --env production',
            env: {
                NODE_ENV: 'production'
            }
        }
    }
};