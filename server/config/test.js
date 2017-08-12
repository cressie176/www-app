module.exports = {
  auth: {
    strategy: {
      id: 'fixed',
      fixed: {
        user: {
          id: 'chuck',
          name: 'Charles Yeager',
        },
      },
    },
    roles: {
        publisher: ['chuck',],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 13000,
  },
};
