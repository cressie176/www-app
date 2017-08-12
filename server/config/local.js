module.exports = {
  auth: {
    strategy: {
      id: 'fixed',
      fixed: {
        user: { id: 'chuck', name: 'Charles Yeager', },
      },
    },
    roles: {
      publisher: ['chuck',],
    },
  },
};
