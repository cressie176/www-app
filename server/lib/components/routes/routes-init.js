export default function() {

  function start({ app, session, passport, }, cb) {
      app.use(session);
      app.use(passport.initialize());
      app.use(passport.session());
      cb();
  }

  return {
    start,
  };
}
