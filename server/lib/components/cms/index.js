import System from 'systemic';
import cms from './cms';

module.exports = new System({ name: 'cms', })
  .add('tag', 1)
  .add('cms', cms()).dependsOn('config', 'logger', 'tag');

