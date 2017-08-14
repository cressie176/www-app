module.exports = {
  auth: {
    roles: {
      guest: ['*',],
      private: ['chuck',],
    },
    strategy: {
      id: 'fixed',
      fixed: {
        user: { id: 'chuck', name: 'Charles Yeager', },
      },
    },
  },
  logger: {
    transport: 'console',
  },
};
