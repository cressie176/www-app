import Debug from 'debug';
import async from 'async';
import request from 'request';
import R from 'ramda';
import slug from 'slug';

const debug = Debug('app:contentful');
const collectionNames = {
  article: 'articles',
  project: 'projects',
  link: 'links',
  linkList: 'linkLists',
  imageSet: 'imageSets',
  homePage: 'pages',
  channelPage: 'pages',
  featuredSoftware: 'featured',
  featuredArticles: 'featured',
};

module.exports = function() {

  function start({ config, logger, }, cb) {

    function fetchContent(cb) {

      const url = `https://cdn.contentful.com/spaces/${config.space}/entries`;
      const loggableUrl = `https://cdn.contentful.com/spaces/******/entries`;
      request({ url: url, auth: { bearer: config.key, }, qs: { limit: 1000, }, json: true, }, (err, res, body) => {
        if (err) return cb(err);
        if (res.statusCode >= 400) return cb(new Error(`Received status ${res.statusCode} getting content from ${loggableUrl}`));
        if (body.errors && body.errors.length > 0) cb(new Error('Invalid content'));
        return cb(null, body);
      });
    }

    function buildKeyValueStore(raw, cb) {
      const kvs = {};

      raw.items.forEach(item => {
        return Object.assign(kvs, {
          [item.sys.id]: {
            fields: item.fields,
            type: item.sys.contentType.sys.id,
          },
        });
      });

      raw.includes.Asset.forEach(item => {
        return Object.assign(kvs, {
          [item.sys.id]: {
            fields: { url: item.fields.file.url, title: item.fields.title, },
            type: 'asset',
          },
        });
      });

      cb(null, kvs);
    }

    function transformContent(kvs, cb) {

      const transformed = Object.keys(kvs).reduce((content, contentId) => {
        const item = kvs[contentId];
        debug(`Transforming ${item.type} '${item.fields.id}'`);

        switch (item.type) {
          case 'asset': {
            return content;
          }
          case 'article': {
            item.fields.id = parseInt(item.fields.id, 10);
            item.fields.slug = slug(`${item.fields.title}-${item.fields.id}`).toLowerCase();
            item.fields.date = new Date(item.fields.date);
            return transformNamedCollection(kvs, content, contentId, item);
          }
          case 'imageSet':
          case 'project':
          case 'featuredArticles':
          case 'featuredSoftware':
          case 'linkList':
          case 'link':
          case 'channelPage':
          case 'homePage': {
            return transformNamedCollection(kvs, content, contentId, item);
          }
          case 'copyright':
          case 'profile':
          case 'site': {
            const contentItem = transformContentItem(kvs, contentId);
            return Object.assign(content, { [item.type]: contentItem, });
          }
          default: {
            return cb(new Error(`Unsupported content type ${item.type}`));
          }
        }
      }, {});

      cb(null, transformed);
    }

    function transformNamedCollection(kvs, content, contentId, item) {
      const collectionName = collectionNames[item.type];
      const collection = content[collectionName] || {};
      const contentItem = transformContentItem(kvs, contentId);
      collection[item.fields.id] = contentItem;
      return Object.assign(content, { [collectionName]: collection, });
    }

    function transformContentItem(kvs, contentId) {
      return Object.keys(kvs[contentId].fields).reduce((fields, name) => {
        return Object.assign(fields, { [name]: resolve(kvs, kvs[contentId].fields[name]), });
      }, kvs[contentId].fields);
    }

    function resolve(kvs, field) {
      switch (R.type(field)) {
        case 'Array': {
          return field.map(item => resolve(kvs, item));
        }
        case 'Object': {
          return kvs[field.sys.id].fields;
        }
        default: {
          return field;
        }
      }
    }

    function extract(cb) {
      async.waterfall([
        fetchContent,
        buildKeyValueStore,
        transformContent,
      ], cb);
    }

    cb(null, { extract, });
  }

  return {
    start: start,
  };
};
