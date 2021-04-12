/*
  Picks desired keys from object, and returns a new object.
  Used in filter responses by picking keys from from req.query.
/*/

const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

module.exports = pick;
