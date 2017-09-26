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

    expect.assertions(6);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/__/status`,
      resolveWithFullResponse: true,
      followRedirect: false,
      json: true,
    });

    expectStatus(res, 200);
    expectHeader(res, 'content-type', 'application/json; charset=utf-8');
    expectHeader(res, 'cache-control', 'no-cache, no-store, must-revalidate');
    expect(res.body.name).toBe('www-app');
  });

  it('should respond with 404 to unknown admin requests', async () => {

    expect.assertions(5);

    await request({
      url: `http://${config.server.host}:${config.server.port}/__/unknown`,
      resolveWithFullResponse: true,
      followRedirect: false,
      json: true,
    }).catch(errors.StatusCodeError, (reason) => {
      expectStatus(reason.response, 404);
      expectHeader(reason.response, 'content-type', 'application/json; charset=utf-8');
      expectHeader(reason.response, 'cache-control', 'no-cache, no-store, must-revalidate');
    });
  });

  it('should respond to client app requests', async () => {

    expect.assertions(7);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/`,
      resolveWithFullResponse: true,
      followRedirect: false,
    });

    expectStatus(res, 200);
    expectHeader(res, 'content-type', 'text/html; charset=utf-8');
    expectHeader(res, 'cache-control', 'public, max-age=3600, must-revalidate');
    expectHeader(res, 'etag');

    const $ = cheerio.load(res.body);
    expect($('title').text()).toBe('Stephen Cresswell');
  });

  it('should redirect /index.html to /', async () => {

    expect.assertions(3);

    await request({
      url: `http://${config.server.host}:${config.server.port}/index.html`,
      resolveWithFullResponse: true,
      followRedirect: false,
    }).catch(errors.StatusCodeError, (reason) => {
      expectStatus(reason.response, 301);
      expectHeader(reason.response, 'location', '/');
    });
  });

  it('should respond to article requests', async () => {

    expect.assertions(7);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/blog/10½ Factor Microservices'`,
      resolveWithFullResponse: true,
      followRedirect: false,
    });

    expectStatus(res, 200);
    expectHeader(res, 'content-type', 'text/html; charset=utf-8');
    expectHeader(res, 'cache-control', 'public, max-age=3600, must-revalidate');
    expectHeader(res, 'etag');

    const $ = cheerio.load(res.body);
    expect($('title').text()).toBe('Stephen Cresswell');
  });

  it('should respond to config requests', async () => {

    expect.assertions(7);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/config.js`,
      resolveWithFullResponse: true,
      followRedirect: false,
    });

    expectStatus(res, 200);
    expectHeader(res, 'content-type', 'application/javascript; charset=utf-8');
    expectHeader(res, 'cache-control', 'public, max-age=3600, must-revalidate');

    const context = { window: {}, };
    evalInContext(context, res.body);

    expect(context.window.config.ga.trackingId).toBe('UA-104642477-2');
    expect(context.window.config.foo).toBe('bar');
  });

  it('should respond to api requests', async () => {

    expect.assertions(6);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/api/content/1.0/articles`,
      resolveWithFullResponse: true,
      followRedirect: false,
      json: true,
    });

    expectStatus(res, 200);
    expectHeader(res, 'content-type', 'application/json; charset=utf-8');
    expectHeader(res, 'cache-control', 'public, max-age=3600, must-revalidate');
    expect(Object.keys(res.body).length).toBe(6);
  });

  it('should respond to sitemap requests', async () => {

    expect.assertions(5);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/sitemap.xml`,
      resolveWithFullResponse: true,
      followRedirect: false,
    });

    expectStatus(res, 200);
    expectHeader(res, 'content-type', 'application/xml; charset=utf-8');
    expectHeader(res, 'cache-control', 'public, max-age=3600, must-revalidate');
  });

  it('should respond to atom feed requests', async () => {

    expect.assertions(5);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/feeds/atom.xml`,
      resolveWithFullResponse: true,
      followRedirect: false,
    });

    expectStatus(res, 200);
    expectHeader(res, 'content-type', 'application/atom+xml; charset=utf-8');
    expectHeader(res, 'cache-control', 'public, max-age=3600, must-revalidate');
  });


  it('should respond to robots.txt requests', async () => {

    expect.assertions(5);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/robots.txt`,
      resolveWithFullResponse: true,
      followRedirect: false,
    });

    expectStatus(res, 200);
    expectHeader(res, 'content-type', 'text/plain; charset=utf-8');
    expectHeader(res, 'cache-control', 'public, max-age=3600, must-revalidate');
  });

  it('should respond to humans.txt requests', async () => {

    expect.assertions(5);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/robots.txt`,
      resolveWithFullResponse: true,
      followRedirect: false,
    });

    expectStatus(res, 200);
    expectHeader(res, 'content-type', 'text/plain; charset=utf-8');
    expectHeader(res, 'cache-control', 'public, max-age=3600, must-revalidate');
  });

  it('should respond to static resource requests', async () => {

    expect.assertions(5);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/facebook.js`,
      resolveWithFullResponse: true,
      followRedirect: false,
    });

    expectStatus(res, 200);
    expectHeader(res, 'content-type', 'application/javascript');
    expectHeader(res, 'cache-control', 'public, max-age=3600, must-revalidate');
  });

  it('should respond with 404 to unknown api requests', async () => {

    expect.assertions(5);

    await request({
      url: `http://${config.server.host}:${config.server.port}/api/1.0/unknown`,
      resolveWithFullResponse: true,
      followRedirect: false,
      json: true,
    }).catch(errors.StatusCodeError, (reason) => {
      expectStatus(reason.response, 404);
      expectHeader(reason.response, 'content-type', 'application/json; charset=utf-8');
      expect(reason.response.body.error).toBe('Not Found');
      expect(reason.response.body.statusCode).toBe(404);
    });
  });

  it('should respond with index.html to unknown client requests', async () => {

    expect.assertions(5);

    await request({
      url: `http://${config.server.host}:${config.server.port}/unknown`,
      resolveWithFullResponse: true,
      followRedirect: false,
    }).catch(errors.StatusCodeError, (reason) => {
      expectStatus(reason.response, 404);
      expectHeader(reason.response, 'content-type', 'text/html; charset=utf-8');
      expectHeader(reason.response, 'cache-control', 'public, max-age=3600, must-revalidate');
    });

  });

  it('should protect private resources', async () => {

    expect.assertions(3);

    await request({
      url: `http://${config.server.host}:${config.server.port}/__/private`,
      resolveWithFullResponse: true,
      followRedirect: false,
    }).catch(errors.StatusCodeError, (reason) => {
      expectStatus(reason.response, 302);
      expectHeader(reason.response, 'location', '/auth/fixed');
    });
  });

  it('should log requests to root', async () => {

    expect.assertions(1);

    const handler = jest.fn();
    logger.on('message', handler);

    await request({
      url: `http://${config.server.host}:${config.server.port}`,
      resolveWithFullResponse: true,
      followRedirect: false,
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/98 Safari/537.4', },
    });

    logger.removeListener('message', handler);
    expect(handler.mock.calls.length).toBe(1);
  });

  it('should log request to robots.txt', async () => {

    expect.assertions(1);

    const handler = jest.fn();
    logger.on('message', handler);

    await request({
      url: `http://${config.server.host}:${config.server.port}/robots.txt`,
      resolveWithFullResponse: true,
      followRedirect: false,
    });

    logger.removeListener('message', handler);
    expect(handler.mock.calls.length).toBe(1);

  });

  it('should not log request to static resources', async () => {

    expect.assertions(1);

    const handler = jest.fn();
    logger.on('message', handler);

    await request({
      url: `http://${config.server.host}:${config.server.port}/facebook.js`,
      resolveWithFullResponse: true,
      followRedirect: false,
    });

    logger.removeListener('message', handler);
    expect(handler.mock.calls.length).toBe(0);

  });

  it('should log requests without user agents', async () => {

    expect.assertions(1);

    const handler = jest.fn();
    logger.on('message', handler);

    await request({
      url: `http://${config.server.host}:${config.server.port}`,
      resolveWithFullResponse: true,
      followRedirect: false,
    });

    logger.removeListener('message', handler);
    expect(handler.mock.calls.length).toBe(1);
  });

  it('should not log request from StatusCake', async () => {

    expect.assertions(1);

    const handler = jest.fn();
    logger.on('message', handler);

    await request({
      url: `http://${config.server.host}:${config.server.port}`,
      resolveWithFullResponse: true,
      followRedirect: false,
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

  function expectStatus(res, value) {
    expect(res.statusCode).toBe(value);
  }

  function expectHeader(res, name, value) {
    expect(res.headers[name]).toBeDefined();
    if (value) expect(res.headers[name].toLowerCase()).toBe(value);
  }
});
