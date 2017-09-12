import cheerio from 'cheerio';
import request from 'request-promise';
import createSystem from '../test-system';
import human from '../../lib/components/logging/human';

describe('Feeds', () => {

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

  describe('Sitemap', () => {

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
      expect($('urlset url loc').eq(0).text()).toBe(`http://${config.server.host}:${config.server.port}`);
      expect($('urlset url loc').eq(1).text()).toBe(`http://${config.server.host}:${config.server.port}/blog`);
      expect($('urlset url loc').eq(2).text()).toBe(`http://${config.server.host}:${config.server.port}/blog/10-factor-microservices-1000`);
    });

  });

  describe('Atom', () => {

    it('should get the atom feed', async () => {

      expect.assertions(25);

      const res = await request({
        url: `http://${config.server.host}:${config.server.port}/feeds/atom`,
        qs: { channel: 'blog', },
        resolveWithFullResponse: true,
      });

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type'].toLowerCase()).toBe('application/atom+xml; charset=utf-8');

      const $ = cheerio.load(res.body, { xmlMode: true, });

      expect($('feed > id').text()).toBe('www.stephen-cresswell.net');
      expect($('feed > title').text()).toBe('www.stephen-cresswell.net');
      expect($('feed > updated').text()).toBe('2017-08-26T18:00:00.000Z');
      expect($('feed > rights').text()).toBe('© 2017 Stephen Cresswell. All rights reserved.');

      expect($('feed > link').eq(0).attr('rel')).toBe('self');
      expect($('feed > link').eq(0).attr('type')).toBe('application/atom+xml');
      expect($('feed > link').eq(0).attr('href')).toBe(`http://${config.server.host}:${config.server.port}/feeds/atom`);
      expect($('feed > link').eq(1).attr('rel')).toBe('alternate');
      expect($('feed > link').eq(1).attr('type')).toBe('text/html');
      expect($('feed > link').eq(1).attr('href')).toBe(`http://${config.server.host}:${config.server.port}`);


      expect($('feed entry').length).toBe(3);
      const entry = $('feed entry').eq(0);
      expect(entry.find('id').text()).toBe('www.stephen-cresswell.net:blog:1002');
      expect(entry.find('title').text()).toBe('Await - I\'ll See You In JavaScript Hell!');
      expect(entry.find('link').attr('rel')).toBe('alternate');
      expect(entry.find('link').attr('type')).toBe('text/html');
      expect(entry.find('link').attr('href')).toBe(`http://${config.server.host}:${config.server.port}/blog/await-ill-see-you-in-javascript-hell-1002`);
      expect(entry.find('author name').text()).toBe('Stephen Cresswell');
      expect(entry.find('category').attr('term')).toBe('blog');
      expect(entry.find('category').attr('label')).toBe('Blog');
      expect(entry.find('updated').text()).toBe('2017-08-26T18:00:00.000Z');
      expect(entry.find('published').text()).toBe('2017-08-26T18:00:00.000Z');
      expect(entry.find('summary').text()).toBeTruthy();
      expect(entry.find('content').text()).toBeTruthy();
    });

    it('should tolerate no channel parameter', async () => {

      expect.assertions(2);

      const res = await request({
        url: `http://${config.server.host}:${config.server.port}/feeds/atom`,
        resolveWithFullResponse: true,
      });

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type'].toLowerCase()).toBe('application/atom+xml; charset=utf-8');
    });

    it('should tolerate unknown channel parameter', async () => {

      expect.assertions(2);

      const res = await request({
        url: `http://${config.server.host}:${config.server.port}/feeds/atom`,
        qs: { channel: 'meh', },
        resolveWithFullResponse: true,
      });

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type'].toLowerCase()).toBe('application/atom+xml; charset=utf-8');
    });

  });
});
