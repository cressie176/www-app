import System from 'systemic';
import adminRoutes from './routes-admin';
import contentRoutes from './routes-content';
import clientRoutes from './routes-client';

module.exports = new System({ name: 'routes', })
  .add('routes.admin', adminRoutes()).dependsOn('config', 'logger', 'app', { component: 'middleware.prepper', destination: 'prepper', }, 'pkg', 'auth')
  .add('routes.content', contentRoutes()).dependsOn('config', 'logger', 'app', { component: 'middleware.prepper', destination: 'prepper', }, 'auth', 'cms', 'tag')
  .add('routes.client', clientRoutes()).dependsOn('config', 'logger', 'app', { component: 'middleware.prepper', destination: 'prepper', }, 'auth')
  .add('routes').dependsOn('routes.admin', 'routes.content', 'routes.client');
