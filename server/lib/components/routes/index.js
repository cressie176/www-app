import System from 'systemic';
import csrf from './csrf';
import admin from './admin';
import content from './content';
import client from './client';
import publisher from './publisher';
import feeds from './feeds';

module.exports = new System({ name: 'routes', })
  .add('routes.csrf', csrf()).dependsOn('config', 'logger', 'app', 'auth')
  .add('routes.admin', admin()).dependsOn('config', 'logger', 'app', { component: 'middleware.prepper', destination: 'prepper', }, 'pkg', 'auth', 'routes.csrf')
  .add('routes.publisher', publisher()).dependsOn('config', 'logger', 'app', 'contentful', { component: 'cms.cache', destination: 'store', }, 'auth', 'routes.csrf')
  .add('routes.content', content()).dependsOn('config', 'logger', 'app', 'auth', { component: 'cms.client', destination: 'cms', }, { component: 'cms.cache', destination: 'store', }, 'routes.csrf')
  .add('routes.feeds', feeds()).dependsOn('config', 'logger', 'app', 'auth', { component: 'cms.client', destination: 'cms', }, { component: 'cms.cache', destination: 'store', }, 'routes.csrf')
  .add('routes.client', client()).dependsOn('config', 'logger', 'app', { component: 'middleware.prepper', destination: 'prepper', }, 'auth', 'routes.csrf')
  .add('routes').dependsOn('routes.admin', 'routes.publisher', 'routes.content', 'routes.feeds', 'routes.client', 'routes.csrf');
