import System from 'systemic';
import initRoutes from './routes-init';
import adminRoutes from './routes-admin';
import apiRoutes from './routes-api';
import proxyRoutes from './routes-proxy';

module.exports = new System({ name: 'routes', })
  .add('routes.init', initRoutes()).dependsOn('app', 'config', 'logger', 'session', 'passport')
  .add('routes.admin', adminRoutes()).dependsOn('config', 'logger', 'app', 'middleware.prepper', 'pkg', 'routes.init')
  .add('routes.api', apiRoutes()).dependsOn('config', 'logger', 'app', 'middleware.prepper', 'routes.init')
  .add('routes.proxy', proxyRoutes()).dependsOn('config', 'logger', 'app', 'auth', 'middleware.prepper', 'routes.init')
  .add('routes').dependsOn('routes.admin', 'routes.api', 'routes.proxy');
