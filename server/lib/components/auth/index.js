import System from 'systemic';
import factory from './strategy-factory';
import roles from './roles';
import passport from './passport';

module.exports = new System({ name: 'auth', })
  .add('passport', passport()).dependsOn('config', 'logger')
  .add('auth.strategy', factory()).dependsOn('config', 'logger', 'app', 'passport')
  .add('auth.roles', roles()).dependsOn('config', 'logger', 'app')
  .add('auth').dependsOn('auth.roles', 'auth.strategy');

