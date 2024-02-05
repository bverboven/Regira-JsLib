import { trim } from "./string-utility";

// consider using https://www.npmjs.com/package/is-plain-object
export const isPlainObject = (obj) => typeof obj === "object" && Object.prototype.toString.call(obj) === "[object Object]";

export const flattenObject = (obj) => {
  const getKey = (key, prefix) => (prefix === "" ? key : `${prefix}.${key}`);
  const flattenProperties = (obj, prefix = "", result = {}) => {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        flattenProperties(obj, `${prefix}[${i}]`, result);
      }
    } else if (typeof obj !== "object") {
      result[prefix] = obj;
    } else {
      for (const entry of Object.entries(obj)) {
        const name = entry[0];
        const value = entry[1];
        if (Array.isArray(value)) {
          for (let i in value) {
            const arrKey = getKey(`${name}[${i}]`, prefix);
            flattenProperties(value[i], arrKey, result);
          }
        } else {
          const objKey = getKey(name, prefix);
          if (typeof value === "object" && Object.keys(value).length > 0) {
            flattenProperties(value, objKey, result);
          } else {
            result[objKey] = value;
          }
        }
      }
    }
    return result;
  };

  return flattenProperties(obj);
};
export const crawlObject = (obj, key) => key.split(".").reduce((res, p) => (res == null ? null : res[p]), obj);
export const removeEmpty = (obj) =>
  Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => value != null)
      .map(([key, value]) => (typeof value === "object" ? [key, removeEmpty(value)] : [key, value]))
  );

export const deepCopy = (obj) => {
  // https://github.com/vuejs/vuex/blob/dev/src/util.js

  const find = (list, f) => list.filter(f)[0];
  const copyWithCache = (o, cache = []) => {
    if (o === null || typeof o !== "object") {
      return o;
    }

    const hit = find(cache, (c) => c.original === o);
    if (hit) {
      return hit.copy;
    }

    if (o instanceof Date) {
      return new Date(o);
    }

    const copy = Array.isArray(o) ? [] : {};
    cache.push({ original: o, copy });

    Object.keys(o).forEach((key) => {
      copy[key] = copyWithCache(o[key], cache);
    });

    return copy;
  };

  return copyWithCache(obj);
};

export const mixin = (target, ...rest) => {
  // https://github.com/jonschlinkert/mixin-deep/blob/master/index.js
  function mixin(target, val, key) {
    const obj = target[key];
    if (isPlainObject(val) && isPlainObject(obj)) {
      target[key] = merge(obj, val);
    } else {
      target[key] = val;
    }
    return target;
  }
  function merge(obj1, obj2) {
    return Object.keys(obj2).reduce((obj, key) => mixin(obj, obj2[key], key), obj1);
  }

  return rest.reduce((r, obj) => merge(r, obj), target);
};

const getKeys = (keyFilter) => (keyFilter ? Object.keys(keyFilter).filter((x) => typeof keyFilter[x] !== "undefined") : []);
export const filterObject = (obj, filter) => {
  const keys = getKeys(filter);
  return (
    !keys.length ||
    keys.every((key) => {
      const filterValue = filter[key]
      if (typeof filterValue === "function") {
        return filterValue.apply(obj, key);
      }
      if (filterValue instanceof Date || typeof filterValue === "number") {
        if (!(key in obj)) {
          const objKey = key[3].toLowerCase() + (key.length > 4 ? key.substring(4) : "");
          const objValue = obj[objKey]
          if (key.startsWith("min")) {
            return objValue >= filterValue;
          }
          if (key.startsWith("max")) {
            return objValue <= filterValue;
          }
        }
      }
      //add wildcard to key so logic can be inside views
      const trimmedKey = trim(key, "*");
      if (typeof filterValue === "string" && (typeof obj[trimmedKey] === "string" || typeof obj[trimmedKey] == "undefined")) {
        const value = filterValue?.toUpperCase();
        const objValue = obj[trimmedKey]?.toUpperCase()
        if (objValue == null && value != null) {
          return false;
        }
        if (key.startsWith("*") && key.endsWith("*")) {
          return objValue?.includes(value);
        } else if (key.startsWith("*")) {
          return objValue?.endsWith(value);
        } else if (key.endsWith("*")) {
          return objValue?.startsWith(value);
        }
      }
      if (key in obj) {
        const objValue = obj[key]
        if (Array.isArray(filterValue) && !Array.isArray(objValue)) {
          return filterValue.some(k => k == objValue);
        } else if (Array.isArray(objValue) && !Array.isArray(filterValue)) {
          return objValue.some(k => k == filterValue);
        } else if (Array.isArray(objValue) && Array.isArray(filterValue)) {
          return filterValue.every((fk) => objValue.some(k => k == fk));
        }
        if (filterValue instanceof Object) {
          // recursive call
          return filterObject(objValue, filterValue);
        }
        // allow flexible comparison ('2' == 2)
        return objValue == filterValue;
      }
      return true;
    })
  );
};

export default {
  isPlainObject,
  flattenObject,
  crawlObject,
  mixin,
  filterObject,
};
