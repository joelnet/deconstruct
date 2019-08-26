// @ts-check

/**
 * Searches an object and it's prototypes for a property.
 * @param {object} object Object to search
 * @param {string|number|symbol} name name of property to search for
 * @returns {object} Returns property if found, otherwise undefined.
 */
const findProp = (object, name) =>
  object == null ? undefined
  : object.hasOwnProperty(name) ? object[name]
  : findProp(Object.getPrototypeOf(object), name) // prettier-ignore

module.exports = {
  findProp
}
