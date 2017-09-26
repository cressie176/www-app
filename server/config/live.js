module.exports = {
  auth: {
    strategy: {
      id: 'github',
      github: {
        client: {
          callbackUrl: 'https://www.stephen-cresswell.net/auth/github/callback',
        },
      },
    },
  },
  cms: {
    store: {
      reference: {
        id: 'live',
      },
    },
  },
  routes: {
    client: {
      public: {
        ga: {
          trackingId: 'UA-104642477-1',
        },
      },
    },
  },
  session: {
    store: 'mongodb',
    mongodb: {
      uri: 'mongodb://www-mongo:27017/www_app_live',
      collection: 'sessions',
    },
  },
};
