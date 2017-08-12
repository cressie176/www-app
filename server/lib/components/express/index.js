import System from 'systemic';
import { defaultMiddleware, app, server, } from 'systemic-express';
import sessionFactory from './session-factory';

module.exports = new System({ name: 'express', })
  .add('app', app()).dependsOn('config', 'logger')
  .add('middleware.default', defaultMiddleware()).dependsOn('logger', 'app', 'routes')
  .add('server', server()).dependsOn('config', 'app', 'middleware.default')
  .add('session', sessionFactory()).dependsOn('config', 'logger');
