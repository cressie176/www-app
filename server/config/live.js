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
  session: {
    store: 'mongodb',
    mongodb: {
      uri: 'mongodb://mongodb:27017/www_app_live',
      collection: 'sessions',
    },
  },
};
