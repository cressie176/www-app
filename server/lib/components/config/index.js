import System from 'systemic';
import confabulous from './confabulous';

module.exports = new System({ name: 'config' })
  .add('config', confabulous(), { scoped: true });

