import { openDB } from 'idb';
import config from '../config';
/**
 * Define data types for validations
 */
export const STRING = 'string';
export const ENUM = 'enum';
export const NUMBER = 'number';
export const DATE = 'date';

const { schema, version, name } = config.database;

export class ValidationError extends Error {}

/**
 * Indexeddb class for sotring different stores
 */
class DBInstance {
  /** @inheritdoc */
  constructor(name = 'onboarder-content', version = 1, models) {
    this.defineModels(models);
    this.dbPromise = openDB(name, version, {
      upgrade(db) {
        Object.keys(models).map(model => {
          const store = db.createObjectStore(model || 'onboarder-content');
          store.createIndex('updatedAt', 'updatedAt');
        });
      }
    });
  }

  /**
   * set the models on the db instance
   * @param {Object<String, Object>} models options
   */
  defineModels(models) {
    this.models = models;
    Object.keys(models).map(model => {
      Object.defineProperty(this, model, {
        get() {
          return this.store(model.toLowerCase());
        }
      });
    });
  }

  /**
   * make sure data created is within the schema
   */
  validate(data = {}) {
    const schema = this.models[this.selectedStore];
    const errors = [];
    Object.keys(schema).map(field => {
      const { type, values, key, required } = schema[field];
      const value = data[field];
      if (required && !value) {
        errors.push(`${field} is required field`);
      } else if (type === ENUM && !values.includes(value)) {
        errors.push(
          `${field} should be one of the values: ${values.join(',')}`
        );
      } else if (typeof value !== type && type !== 'enum') {
        errors.push(`${field} should be type of ${type}`);
      }
    });
    if (errors.length > 0) {
      throw new ValidationError(`\n${errors.join('\n')}`);
    }
    return this;
  }

  /**
   * choose the right store
   */
  store(name) {
    this.selectedStore = name;
    return this;
  }

  /**
   * get a sepecific key from a store
   *
   * @return {Promise<string>}
   */
  async get(key) {
    return (await this.dbPromise).get(this.selectedStore, key);
  }

  /**
   * create a new record by a key and value
   *
   * @param {String} key to store a new record
   * @param {Object} a object contains different fields to store
   * @return {Promise<string>}
   */
  async create(key, value) {
    const data = {
      ...value,
      updatedAt: Date.now()
    };
    this.validate(data);
    (await this.dbPromise).put(this.selectedStore, data, key);
    return this;
  }

  /**
   * create a new record by a key and value
   *
   * @param {Object<String, Object>} a object restored data
   * @return {Promise<string>}
   */
  async restore(data) {
    const dbInstance = await this.dbPromise;
    const models = Object.keys(data);
    const tasks = [];
    models.map(model =>
      Object.keys(data[model]).map(key =>
        tasks.push(dbInstance.put(model, data[model][key], key))
      )
    );
    return Promise.all(tasks);
  }

  /**
   * create a backup of all the data
   * @return {Promise<string>}
   */
  async backup() {
    const models = Object.keys(this.models);
    const tasks = [];
    models.map(selected => {
      tasks.push(
        this.query({ flat: true, selected, groupBy: 'key' }).then(result => [
          selected,
          result || {}
        ])
      );
    });
    const result = await Promise.all(tasks);
    return Object.fromEntries(result);
  }
  /**
   * delete sepecific key from a store
   *
   * @return {Promise<string>}
   */
  async remove(key) {
    return (await this.dbPromise).delete(this.selectedStore, key);
  }

  /**
   * delete all content of the store
   *
   * @return {Promise<string>}
   */
  async clear() {
    return (await this.dbPromise).clear(this.selectedStore);
  }

  /**
   * get a array of all keys of a store
   *
   * @return {Array<string>}
   */
  async keys() {
    return (await this.dbPromise).getAllKeys(this.selectedStore);
  }

  /**
   * Query all data from an IndexedDB database by specific index
   *
   * @param {Object} args the arguments for the query
   * @param {String} args.groupBy a key to choose to create map
   * @param {String} args.index a indice to choose to fetch data from
   * @return {Promise<string>}
   */
  async query({
    index = 'updatedAt',
    groupBy,
    flat = false,
    filter = () => true,
    selected = this.selectedStore
  }) {
    const store = await this.dbPromise;
    const result = (await store.getAllFromIndex(selected, index)).filter(
      filter
    );
    if (!groupBy) {
      return result;
    }
    const groupByMap = {};
    result.map(item => {
      const groupedBy = item[groupBy];
      if (flat) {
        groupByMap[groupedBy] = item;
        return;
      }
      if (!groupByMap[groupedBy]) {
        groupByMap[groupedBy] = [];
      }
      groupByMap[groupedBy].push(item);
    });

    return groupByMap;
  }

  /**
   * Extract numbers around amount of items in the db by query
   *
   * @param {Object} args the arguments for the query
   * @param {String} args.groupBy a key to choose to create map
   * @param {String} args.index a indice to choose to fetch data from
   * @return {Promise<string>}
   */
  async aggregate({
    index = 'updatedAt',
    groupBy,
    flat = false,
    filter = () => true
  }) {
    const result = await this.query({ index, groupBy, flat, filter });
    const counters = {};
    Object.keys(result).map(key => (counters[key] = result[key].length || 0));
    return counters;
  }
}

/**
 * exposing different methods of our indexeddb
 */
const db = new DBInstance(name, version, schema);
window.__db = db;
export default db;
