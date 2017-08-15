module.exports = {
  routes: {
    client: {
      public: {
        ga: {
          trackingId: 'UA-104642477-1',
        },
      },
    },
  },
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
  session: {
    store: 'mongodb',
    mongodb: {
      uri: 'mongodb://www-mongo:27017/www_app_stage',
      collection: 'sessions',
    },
  },
};
