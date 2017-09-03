import System from 'systemic';
import admin from './admin';
import content from './content';
import client from './client';
import publisher from './publisher';

module.exports = new System({ name: 'routes', })
  .add('routes.admin', admin()).dependsOn('config', 'logger', 'app', { component: 'middleware.prepper', destination: 'prepper', }, 'pkg', 'auth')
  .add('routes.publisher', publisher()).dependsOn('config', 'logger', 'app', 'contentful', { component: 'cms.cache', destination: 'store', }, 'auth')
  .add('routes.content', content()).dependsOn('config', 'logger', 'app', 'auth', { component: 'cms.client', destination: 'cms', }, { component: 'cms.cache', destination: 'store', })
  .add('routes.client', client()).dependsOn('config', 'logger', 'app', { component: 'middleware.prepper', destination: 'prepper', }, 'auth')
  .add('routes').dependsOn('routes.admin', 'routes.publisher', 'routes.content', 'routes.client');
