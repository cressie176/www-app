import chalk from 'chalk';
import hogan from 'hogan.js';
import merge from 'lodash.merge';
import has from 'lodash.has';
import omit from 'lodash.omit';

const response = hogan.compile('{{{displayTime}}} {{{displayTracer}}} {{{displayLevel}}} {{package.name}} {{{request.method}}} {{{response.statusCode}}} {{{request.url}}}');
const error = hogan.compile('{{{displayTime}}} {{{displayTracer}}} {{{displayLevel}}} {{package.name}} {{{message}}} {{{code}}}\n{{{error.stack}}} {{{details}}}');
const info = hogan.compile('{{{displayTime}}} {{{displayTracer}}} {{{displayLevel}}} {{package.name}} {{{message}}} {{{details}}}');

const colours = {
    debug: chalk.gray,
    info: chalk.white,
    warn: chalk.yellow,
    error: chalk.red,
    default: chalk.white,
};

export default function() {

  function start(cb) {
    cb(null, onMessage);
  }

  function onMessage(event) {
    const details = omit(event, ['message', 'level',]);
    const data = merge({}, event, {
      displayTracer: has(event, 'tracer') ? event.tracer.substr(0, 6) : '------',
      displayLevel: event.level.toUpperCase(),
      details: Object.keys(details).length ? `\n ${JSON.stringify(details, null, 2)}` : '',
      displayTime: event.timestamp.toISOString(),
    });
    const colour = colours[event.level] || colours.default;
    const log = console[event.level] || console.info; // eslint-disable-line no-console
    if (has(event, 'response.statusCode')) log(colour(response.render(data)));
    else if (has(event, 'error.message')) log(colour(error.render(data)));
    else log(colour(info.render(data)));
  }

  return {
    start,
  };
}

