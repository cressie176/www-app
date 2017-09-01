import System from 'systemic';
import cms from './cms';
import contentful from './contentful';

module.exports = new System({ name: 'cms', })
  .add('tag', 1)
  .add('cms', cms()).dependsOn('config', 'logger', 'tag')
  .add('contentful', contentful()).dependsOn('config', 'logger');

