import System from 'systemic';
import adminRoutes from './routes-admin';
import articlesRoutes from './routes-articles';
import clientRoutes from './routes-client';

module.exports = new System({ name: 'routes', })
  .add('routes.admin', adminRoutes()).dependsOn('config', 'logger', 'app', { component: 'middleware.prepper', destination: 'prepper', }, 'pkg', 'auth')
  .add('routes.articles', articlesRoutes()).dependsOn('config', 'logger', 'app', { component: 'middleware.prepper', destination: 'prepper', }, 'auth', 'cms')
  .add('routes.client', clientRoutes()).dependsOn('config', 'logger', 'app', { component: 'middleware.prepper', destination: 'prepper', }, 'auth')
  .add('routes').dependsOn('routes.admin', 'routes.articles', 'routes.client');
