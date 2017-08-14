import System from 'systemic';
import adminRoutes from './routes-admin';
import apiRoutes from './routes-api';
import clientRoutes from './routes-client';

module.exports = new System({ name: 'routes', })
  .add('routes.admin', adminRoutes()).dependsOn('config', 'logger', 'app', { component: 'middleware.prepper', destination: 'prepper', }, 'pkg', 'auth')
  .add('routes.api', apiRoutes()).dependsOn('config', 'logger', 'app', { component: 'middleware.prepper', destination: 'prepper', }, 'auth')
  .add('routes.client', clientRoutes()).dependsOn('config', 'logger', 'app', { component: 'middleware.prepper', destination: 'prepper', }, 'auth')
  .add('routes').dependsOn('routes.admin', 'routes.api', 'routes.client');
