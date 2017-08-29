import cheerio from 'cheerio';
import request from 'request-promise';
import errors from 'request-promise/errors';
import createSystem from './test-system';

describe('www.stephen-cresswell.net', () => {

  let system;
  let config;
  let logger;

  beforeAll(cb => {
    system = createSystem().start((err, components) => {
      if (err) return cb(err);
      config = components.config;
      logger = components.logger;
      cb();
    });
  });

  afterAll(cb => {
    system.stop(cb);
  });

  it('should respond to status requests', async () => {

    expect.assertions(3);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/__/status`,
      resolveWithFullResponse: true,
      json: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
    expect(res.body.name).toBe('www-app');
  });

  it('should respond to application requests', async () => {

    expect.assertions(3);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/`,
      resolveWithFullResponse: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type'].toLowerCase()).toBe('text/html; charset=utf-8');
    const $ = cheerio.load(res.body);
    expect($('title').text()).toBe('Stephen Cresswell');
  });

  it('should respond to config requests', async () => {

    expect.assertions(4);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/config.js`,
      resolveWithFullResponse: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type'].toLowerCase()).toBe('application/javascript; charset=utf-8');

    const context = { window: {}, };
    evalInContext(context, res.body);

    expect(context.window.config.ga.trackingId).toBe('UA-104642477-2');
    expect(context.window.config.foo).toBe('bar');
  });

  it('should respond to api requests', async () => {

    expect.assertions(3);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/api/content/1.0/articles?channel=missing`,
      resolveWithFullResponse: true,
      json: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
    expect(res.body.total).toBe(0);
  });

  it('should respond with 404 to unknown api requests', async () => {

    expect.assertions(2);

    await request({
      url: `http://${config.server.host}:${config.server.port}/api/1.0/unknown`,
      resolveWithFullResponse: true,
      json: true,
    }).catch(errors.StatusCodeError, (reason) => {
      expect(reason.statusCode).toBe(404);
      expect(reason.response.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
    });
  });

  it('should respond with index.html to unknown client requests', async () => {

    expect.assertions(2);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/unknown`,
      resolveWithFullResponse: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type'].toLowerCase()).toBe('text/html; charset=utf-8');
  });

  it('should protect private resources', async () => {

    expect.assertions(2);

    await request({
      url: `http://${config.server.host}:${config.server.port}/__/private`,
      resolveWithFullResponse: true,
      followRedirect: false,
    }).catch(errors.StatusCodeError, (reason) => {
      expect(reason.statusCode).toBe(302);
      expect(reason.response.headers.location).toBe('/auth/fixed');
    });
  });

  it('should log requests under normal circumstances', async () => {

    expect.assertions(1);

    const handler = jest.fn();
    logger.on('message', handler);

    await request({
      url: `http://${config.server.host}:${config.server.port}`,
      resolveWithFullResponse: true,
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/98 Safari/537.4', },
    });

    logger.removeListener('message', handler);
    expect(handler.mock.calls.length).toBe(1);
  });

  it('should not log request to static resources', async () => {

    expect.assertions(1);

    const handler = jest.fn();
    logger.on('message', handler);

    await request({
      url: `http://${config.server.host}:${config.server.port}/robots.txt`,
      resolveWithFullResponse: true,
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/98 Safari/537.4', },
    });

    logger.removeListener('message', handler);
    expect(handler.mock.calls.length).toBe(0);

  });

  it('should not log request from StatusCake', async () => {

    expect.assertions(1);

    const handler = jest.fn();
    logger.on('message', handler);

    await request({
      url: `http://${config.server.host}:${config.server.port}`,
      resolveWithFullResponse: true,
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/98 Safari/537.4 (StatusCake)', },
    });

    logger.removeListener('message', handler);
    expect(handler.mock.calls.length).toBe(0);
  });

  function evalInContext(context, script) {
    const fn = function (script) {
      return eval(script);
    };
    fn.call(context, script);
  }
});
