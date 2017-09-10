module.exports = {
  auth: {
    strategy: {
      id: 'github',
      github: {
        client: {
          callbackUrl: 'https://stage.stephen-cresswell.net/auth/github/callback',
        },
      },
    },
  },
  cms: {
    store: {
      reference: {
        id: 'stage',
      },
    },
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
  },
  session: {
    store: 'mongodb',
    mongodb: {
      uri: 'mongodb://www-mongo:27017/www_app_stage',
      collection: 'sessions',
    },
  },
};
