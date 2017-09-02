import Debug from 'debug';
import async from 'async';
import request from 'request';
import R from 'ramda';
import slug from 'slug';
import path from 'path';

const debug = Debug('app:contentful');
const collectionNames = {
  article: 'articles',
  project: 'projects',
  link: 'links',
  linkList: 'linkLists',
  imageSet: 'imageSets',
  homePage: 'pages',
  legalPage: 'pages',
  channelPage: 'pages',
  featuredSoftware: 'featured',
  featuredArticles: 'featured',
};

class KeyValueStore {
  constructor() {
    this.store = {};
  }

  set(id, type, fields) {
    this.store[id] = { id, fields, type, };
  }

  get(id) {
    return this.store[id];
  }

  resolveAll() {
    this.values().forEach(item => {
      Object.keys(item.fields).forEach(name => {
        item.fields[name] = this.resolve(item.fields[name]);
      });
    });
  }

  resolve(field) {
    switch (R.type(field)) {
      case 'Array': {
        return field.map(item => this.resolve(item));
      }
      case 'Object': {
        return field.sys ? this.get(field.sys.id).fields : field;
      }
      default: {
        return field;
      }
    }
  }

  addItem(item) {
    this.set(item.sys.id, item.sys.contentType.sys.id, item.fields);
  }

  addAsset(asset) {
    this.set(asset.sys.id, 'asset', { url: asset.fields.file.url, title: asset.fields.title, });
  }

  values() {
    return R.values(this.store);
  }
}

export default function() {

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
      const kvs = new KeyValueStore();
      raw.items.forEach(item => kvs.addItem(item));
      raw.includes.Asset.forEach(asset => kvs.addAsset(asset));
      kvs.resolveAll();
      cb(null, kvs);
    }

    function transformContent(kvs, cb) {

      const transformed = kvs.values().reduce((content, item) => {
        debug(`Transforming ${item.type} '${item.fields.id}'`);

        switch (item.type) {
          case 'asset': {
            return content;
          }
          case 'article': {
            item.fields.id = parseInt(item.fields.id, 10);
            item.fields.url = path.join('/', item.fields.channel.link.url, slug(`${item.fields.title}-${item.fields.id}`).toLowerCase());
            item.fields.date = new Date(item.fields.date);
          }
          case 'imageSet':
          case 'project':
          case 'featuredArticles':
          case 'featuredSoftware':
          case 'linkList':
          case 'link':
          case 'channelPage':
          case 'legalPage':
          case 'homePage': {
            const collectionName = collectionNames[item.type];
            const collection = content[collectionName] || {};
            collection[item.fields.id] = item.fields;
            return Object.assign(content, { [collectionName]: collection, });
          }
          case 'copyright':
          case 'profile':
          case 'site': {
            return Object.assign(content, { [item.type]: item.fields, });
          }
          default: {
            return cb(new Error(`Unsupported content type ${item.type}`));
          }
        }
      }, {});

      cb(null, transformed);
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
}
