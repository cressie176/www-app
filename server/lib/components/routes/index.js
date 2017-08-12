import System from 'systemic';
import adminRoutes from './admin-routes';
import apiRoutes from './api-routes';
import proxyRoutes from './proxy-routes';

module.exports = new System({ name: 'routes', })
  .add('routes.admin', adminRoutes()).dependsOn('config', 'logger', 'app', 'middleware.prepper', 'pkg')
  .add('routes.api', apiRoutes()).dependsOn('config', 'logger', 'app', 'middleware.prepper')
  .add('routes.proxy', proxyRoutes()).dependsOn('config', 'logger', 'app', 'middleware.prepper')
  .add('routes').dependsOn('routes.admin', 'routes.api', 'routes.proxy');
