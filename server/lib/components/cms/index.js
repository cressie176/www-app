import System from 'systemic';
import cms from './cms';
import store from './store';
import cache from './cache';
import contentful from './contentful';

module.exports = new System({ name: 'cms', })
  .add('cms.store', store()).dependsOn('config', 'logger')
  .add('cms.cache', cache()).dependsOn('config', 'logger',{ component: 'cms.store', destination: 'store', }, )
  .add('cms.client', cms()).dependsOn('config', 'logger', { component: 'cms.cache', destination: 'store', })
  .add('contentful', contentful()).dependsOn('config', 'logger');

