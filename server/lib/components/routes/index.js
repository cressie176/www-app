import System from 'systemic';
import initRoutes from './routes-init';
import adminRoutes from './routes-admin';
import apiRoutes from './routes-api';
import clientRoutes from './routes-client';

module.exports = new System({ name: 'routes', })
  .add('routes.init', initRoutes()).dependsOn('app', 'config', 'logger', 'session', 'passport')
  .add('routes.admin', adminRoutes()).dependsOn('config', 'logger', 'app', 'middleware.prepper', 'pkg', 'routes.init')
  .add('routes.api', apiRoutes()).dependsOn('config', 'logger', 'app', 'middleware.prepper', 'routes.init')
  .add('routes.client', clientRoutes()).dependsOn('config', 'logger', 'app', 'auth', 'middleware.prepper', 'routes.init')
  .add('routes').dependsOn('routes.admin', 'routes.api', 'routes.client');
