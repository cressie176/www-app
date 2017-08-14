import System from 'systemic';
import prepper from './prepper';
import console from './console';
import bunyan from './bunyan';
import prepperMiddleware from './prepper-middleware';

module.exports = new System({ name: 'logging', })
  .add('transports.console', console())
  .add('transports.bunyan', bunyan()).dependsOn('pkg')
  .add('transports').dependsOn(
    { component: 'transports.console', destination: 'console', },
    { component: 'transports.bunyan', destination: 'bunyan', })
  .add('logger', prepper()).dependsOn('config', 'pkg', 'transports')
  .add('middleware.prepper', prepperMiddleware()).dependsOn('app');

