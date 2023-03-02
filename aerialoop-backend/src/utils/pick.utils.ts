/**
 * Creates object compose of the selected properties
 * @param {Object} object
 * @param {string[]} keys
 */
const pick = (object: any, keys: Array<string>) => {
  return keys.reduce((obj: any, key: string) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export default pick;
