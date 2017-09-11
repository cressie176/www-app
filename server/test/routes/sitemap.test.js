import cheerio from 'cheerio';
import request from 'request-promise';
import createSystem from '../test-system';
import human from '../../lib/components/logging/human';

describe('Sitemap', () => {

  let config;
  let system = { stop: cb => cb(), };

  const loggerOptions = {};

  beforeAll(done => {
    system = createSystem()
      .set('config.overrides', { server: { port: 13004, }, })
      .set('transports.human', human(loggerOptions))
      .start((err, components) => {
      if (err) return done(err);
      config = components.config;
      done();
    });
  });

  afterEach(() => {
    loggerOptions.suppress = false;
  });

  afterAll(done => {
    system.stop(done);
  });


  it('should get the sitemap', async () => {

    expect.assertions(6);

    const res = await request({
      url: `http://${config.server.host}:${config.server.port}/sitemap.xml`,
      resolveWithFullResponse: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type'].toLowerCase()).toBe('application/xml; charset=utf-8');

    const $ = cheerio.load(res.body);
    expect($('urlset url loc').length).toBe(9);
    expect($('urlset url loc').eq(0).text()).toBe(`https://${config.server.host}:${config.server.port}`);
    expect($('urlset url loc').eq(1).text()).toBe(`https://${config.server.host}:${config.server.port}/blog`);
    expect($('urlset url loc').eq(2).text()).toBe(`https://${config.server.host}:${config.server.port}/blog/10-factor-microservices-1000`);
  });

});
