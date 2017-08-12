import System from 'systemic';
import prepper from './prepper';
import console from './console';
import prepperMiddleware from './prepper-middleware';

module.exports = new System({ name: 'logging', })
  .add('transport', console())
  .add('logger', prepper()).dependsOn('config', 'pkg', 'transport')
  .add('middleware.prepper', prepperMiddleware()).dependsOn('app');

