const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

/********************************************************************************************
 Using 'module.exports' to workaround TypeError require is not a function
 See https://stackoverflow.com/questions/33007878/nodejs-typeerror-require-is-not-a-function
 ********************************************************************************************/
module.exports = function() {

  function start({ config, logger, }, cb) {

    logger.info('Using mongodb based session');

    const store = new MongoDBStore({
      uri: config.mongodb.uri,
      collection: config.mongodb.collection,
    });

    store.on('error', err => {
      logger.error(`Error from session store: ${config.mongodb.uri}`, err);
    });

    cb(null, session({
      secret: config.secret,
      store: store,
      resave: true,
      saveUninitialized: true,
    }));
  }

  return {
    start,
  };
};
