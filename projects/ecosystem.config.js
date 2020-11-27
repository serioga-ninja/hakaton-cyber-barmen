const path = require('path');

module.exports = {
  apps: [
    {
      name: 'API',
      script: './Server/dist/src/index.js',
      max_memory_restart: '500M',
      time: true,
      env: {
        NODE_ENV: 'production',
        CLIENT_FOLDER: path.resolve(process.cwd(), 'Client')
      }
    },
    {
      name: 'Device API',
      script: './Server/dist/src/Device/device.server.js',
      max_memory_restart: '500M',
      time: true,
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'Notifications API',
      script: './Server/dist/src/Notifications/notifications.server.js',
      max_memory_restart: '500M',
      time: true,
      env: {
        NODE_ENV: 'production'
      }
    },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
