import System from 'systemic';
import cms from './cms';
import store from './store';
import contentful from './contentful';

module.exports = new System({ name: 'cms', })
  .add('tag', 2)
  .add('cms.store', store()).dependsOn('config', 'logger')
  .add('cms.client', cms()).dependsOn('config', 'logger', { component: 'cms.store', destination: 'store', }, 'tag')
  .add('contentful', contentful()).dependsOn('config', 'logger');

