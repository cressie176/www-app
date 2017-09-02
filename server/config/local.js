module.exports = {
  server: {
    port: 3001,
  },
  routes: {
    client: {
      public: {
        featureToggles: {
          profile: true,
          featuredProjects: true,
          featuredTalks: true,
          featuredArticles: false,
        },
      },
    },
  },
  auth: {
    roles: {
      guest: ['*',],
      publisher: ['*',],
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
    transport: 'human',
  },
};
