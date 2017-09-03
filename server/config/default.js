const path = require('path');

module.exports = {
  auth: {
    roles: {
      guest: [],
      private: [],
      forbidden: [],
    },
  },
  cms: {
    store: {
      content: {
        path: path.join(process.cwd(), 'server', 'content', 'data'),
      },
      reference: {
        path: path.join(process.cwd(), 'server', 'content', 'references'),
      },
    },
    cache: {
      max: 3,
    },
  },
  contentful: {
    timeout: 5000,
  },
  logger: {
    transport: 'bunyan',
    include: [
      'tracer',
      'timestamp',
      'level',
      'message',
      'error.message',
      'error.code',
      'error.stack',
      'request.url',
      'request.headers',
      'request.params',
      'request.method',
      'response.statusCode',
      'response.headers',
      'response.time',
      'process',
      'system',
      'package.name',
      'app',
    ],
    exclude: [
      'password',
      'secret',
      'token',
      'request.headers.cookie',
      'dependencies',
      'devDependencies',
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  routes: {
    client: {
      public: {
        ga: {
          trackingId: 'UA-104642477-2',
        },
      },
    },
  },
  session: {
    store: 'memory',
    secret: 'secret',
  },
};
