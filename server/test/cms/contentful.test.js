import createSystem from '../test-system';
import nock from 'nock';
import rawContent from './data/contentful';

describe.only('Contentful', () => {

  let system;
  let config;
  let contentful;

  beforeAll(cb => {

    system = createSystem().start((err, components) => {
      if (err) return cb(err);
      config = components.config;
      contentful = components.contentful;
      cb();
    });
  });

  afterAll(cb => {
    system.stop(cb);
  });

  describe('Fetch', () => {

    afterEach(() => {
      nock.cleanAll();
    });

    it('should report fetch errors', done => {

      nock('https://cdn.contentful.com').get(`/spaces/${config.contentful.space}/entries?limit=1000`).reply(500);

      contentful.extract((err, content) => {
        expect(err).toBeDefined();
        expect(err.message).toBe('Received status 500 getting content from https://cdn.contentful.com/spaces/******/entries');
        done();
      });
    });

  });

  describe('Transformation', () => {

    beforeEach(() => {
      nock('https://cdn.contentful.com').get(`/spaces/${config.contentful.space}/entries?limit=1000`).reply(200, rawContent);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should transform site', done => {

      contentful.extract((err, content) => {
        expect(err).toBe(null);
        expect(content).toBeDefined();
        expect(content.site).toBeDefined();
        expect(content.site.id).toBe('www.stephen-cresswell.net');
        expect(content.site.navigation).toBeDefined();
        expect(content.site.navigation.links.length).toBe(3);
        expect(content.site.spotlights.length).toBe(3);
        expect(content.site.copyright).toBeDefined();
        expect(content.site.copyright.year).toBe(2017);
        expect(content.site.copyright.owner).toBe('Stephen Cresswell');
        expect(content.site.copyright.rights).toBe('All rights reserved.');
        done();
      });
    });

    it('should transform projects', done => {

      contentful.extract((err, content) => {
        expect(err).toBe(null);
        expect(content).toBeDefined();
        expect(content.projects).toBeDefined();

        expect(content.projects['yadda'].id).toBe('yadda');
        expect(content.projects['yadda'].title).toBe('Yadda');
        expect(content.projects['yadda'].summary).toBe('A cucumber-esque BDD library, but with greater flexibility');
        expect(content.projects['yadda'].body).toBe('A cucumber-esque BDD library, but with greater flexibility');
        expect(content.projects['yadda'].url).toBe('https://www.github.com/acuminous/yadda');
        done();
      });
    });

    it('should transform profile', done => {

      contentful.extract((err, content) => {
        expect(err).toBe(null);
        expect(content).toBeDefined();
        expect(content.profile).toBeDefined();
        expect(content.profile.id).toBe('profile');
        expect(content.profile.title).toBe('Profile');
        expect(content.profile.body).toBeDefined();
        done();
      });
    });

    it('should transform copyright', done => {

      contentful.extract((err, content) => {
        expect(err).toBe(null);
        expect(content).toBeDefined();
        expect(content.copyright).toBeDefined();
        expect(content.copyright.id).toBe('© 2017 Stephen Cresswell. All rights reserved.');
        expect(content.copyright.year).toBe(2017);
        expect(content.copyright.owner).toBe('Stephen Cresswell');
        expect(content.copyright.rights).toBe('All rights reserved.');
        done();
      });
    });

    it('should transform image sets', done => {

      contentful.extract((err, content) => {
        expect(err).toBe(null);
        expect(content).toBeDefined();
        expect(content.imageSets).toBeDefined();
        expect(content.imageSets['Yadda - The Other BDD Library'].id).toBe('Yadda - The Other BDD Library');
        expect(content.imageSets['Yadda - The Other BDD Library'].mainImage).toBeDefined();
        expect(content.imageSets['Yadda - The Other BDD Library'].mainImage.url).toBeDefined();
        expect(content.imageSets['Yadda - The Other BDD Library'].thumbnailImage).toBeDefined();
        expect(content.imageSets['Yadda - The Other BDD Library'].thumbnailImage.url).toBeDefined();
        done();
      });
    });

    it('should transform link lists', done => {

      contentful.extract((err, content) => {
        expect(err).toBe(null);
        expect(content).toBeDefined();
        expect(content.linkLists).toBeDefined();

        expect(content.linkLists.social.id).toBe('social');
        expect(content.linkLists.social.title).toBe('Social Networks');
        expect(content.linkLists.social.links.length).toBe(3);

        expect(content.linkLists.social.links[0]).toBe(content.links.GitHub);

        done();
      });
    });

    it('should transform links', done => {

      contentful.extract((err, content) => {
        expect(err).toBe(null);
        expect(content).toBeDefined();
        expect(content.links).toBeDefined();
        expect(content.links.GitHub.id).toBe('GitHub');
        expect(content.links.GitHub.text).toBe('GitHub');
        expect(content.links.GitHub.icon).toBe('fa-github');
        expect(content.links.GitHub.url).toBe('https://www.github.com/cressie176/');
        done();
      });
    });

    it('should transform the home page', done => {

      contentful.extract((err, content) => {
        expect(err).toBe(null);
        expect(content).toBeDefined();
        expect(content.pages).toBeDefined();
        expect(content.pages.home).toBeDefined();

        expect(content.pages.home.id).toBe('home');
        expect(content.pages.home.title).toBe('Home');
        expect(content.pages.home.heroImage).toBeDefined();
        expect(content.pages.home.heroImage.title).toBeDefined();
        expect(content.pages.home.heroImage.url).toBeDefined();

        expect(content.pages.home.profile).toBe(content.profile);

        expect(content.pages.home.featuredSoftware).toBe(content.featured.software);
        expect(content.pages.home.featuredTalks).toBe(content.featured.talks);
        expect(content.pages.home.featuredArticles).toBe(content.featured.articles);

        done();
      });
    });

    it('should transform featured software', done => {

      contentful.extract((err, content) => {
        expect(err).toBe(null);
        expect(content).toBeDefined();
        expect(content.featured).toBeDefined();
        expect(content.featured.software).toBeDefined();
        expect(content.featured.software.id).toBe('software');
        expect(content.featured.software.icon).toBe('fa-laptop');
        expect(content.featured.software.items.length).toBe(5);
        expect(content.featured.software.items[0].summary).toBe('A cucumber-esque BDD library, but with greater flexibility');
        expect(content.featured.software.items[0].body).toBe('A cucumber-esque BDD library, but with greater flexibility');
        expect(content.featured.software.items[0].url).toBe('https://www.github.com/acuminous/yadda');

        done();
      });
    });

    it('should transform featured articles', done => {

      contentful.extract((err, content) => {
        expect(err).toBe(null);
        expect(content).toBeDefined();
        expect(content.featured).toBeDefined();
        expect(content.featured.articles).toBeDefined();
        expect(content.featured.articles.id).toBe('articles');
        expect(content.featured.articles.icon).toBe('fa-file-text-o');
        expect(content.featured.articles.items.length).toBe(3);
        expect(content.featured.articles.items[0]).toBe(content.articles[1]);
        done();
      });
    });

    it('should transform featured talks', done => {

      contentful.extract((err, content) => {
        expect(err).toBe(null);
        expect(content).toBeDefined();
        expect(content.featured).toBeDefined();
        expect(content.featured.talks).toBeDefined();
        expect(content.featured.talks.id).toBe('talks');
        expect(content.featured.talks.icon).toBe('fa-microphone');
        expect(content.featured.talks.items.length).toBe(3);
        expect(content.featured.talks.items[0]).toBe(content.articles[1]);
        done();
      });
    });

    it('should transform articles', done => {

      contentful.extract((err, content) => {
        expect(err).toBe(null);
        expect(content).toBeDefined();
        expect(content.articles[1]).toBeDefined();
        expect(content.articles[1].id).toBe(1);
        expect(content.articles[1].title).toBe('Enterprise Grade Microservices');
        expect(content.articles[1].slug).toBe('enterprise-grade-microservices-1');
        expect(content.articles[1].channel).toBe(content.pages['talks']);
        expect(content.articles[1].keywords).toContain('Microservices');
        expect(content.articles[1].date.toISOString()).toBe('2016-11-23T19:00:00.000Z');
        expect(content.articles[1].location).toBe('Budapest');

        expect(content.articles[1].images).toBe(content.imageSets['Enterprise Grade Microservices']);

        done();
      });
    });
  });
});
