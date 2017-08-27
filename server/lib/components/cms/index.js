import System from 'systemic';

module.exports = new System({ name: 'cms', })
  .add('cms', {}).dependsOn('config', 'logger');

