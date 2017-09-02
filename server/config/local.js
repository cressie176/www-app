module.exports = {
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
  cms: {
    store: {
      tag: {
        name: 'local',
      },
    },
  },
  logger: {
    transport: 'human',
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
  server: {
    port: 3001,
  },
};
