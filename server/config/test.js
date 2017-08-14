module.exports = {
  auth: {
    roles: {
      guest: ['*',],
      private: ['chuck',],
    },
    strategy: {
      id: 'fixed',
      fixed: {
        user: {
          id: 'chuck',
          name: 'Charles Yeager',
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 13000,
  },
  logger: {
    transport: 'console',
  },
};
