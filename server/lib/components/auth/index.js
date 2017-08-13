import System from 'systemic';
import factory from './strategy-factory';
import roles from './roles';
import passport from './passport';

module.exports = new System({ name: 'auth', })
  .add('passport', passport()).dependsOn('config', 'logger')
  .add('auth.strategy', factory()).dependsOn('config', 'logger', 'app', 'session', 'passport', 'middleware.prepper')
  .add('auth.roles', roles()).dependsOn('config', 'logger', 'app', 'middleware.prepper')
  .add('auth').dependsOn('auth.roles', );

