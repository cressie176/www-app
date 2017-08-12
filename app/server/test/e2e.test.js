import request from 'request-promise'
import createSystem from './test-system'

describe('admin api', () => {

  let system;
  let config;

  beforeAll(cb => {
    system = createSystem().start((err, components) => {
      if (err) return cb(err);
      config = components.config;
      cb();
    })
  })

  afterAll(cb => {
    system.stop(cb);
  })

  it('should respond to status requests', async () => {
    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/__/status`,
      resolveWithFullResponse: true,
      json: true
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(res.body.name).toBe('www-app');
  })
})
