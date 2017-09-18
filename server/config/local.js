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
      reference: {
        id: 'local',
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
          featuredSoftware: true,
          featuredTalks: true,
          featuredArticles: true,
        },
      },
    },
    csrf: {
      secure: false,
    },
  },
  server: {
    port: 3001,
  },
};
