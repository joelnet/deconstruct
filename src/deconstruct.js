// @ts-check
const { findProp } = require('./lib/findProp')

/**
 * Deconstructs a Class into functions
 * @param {object} type Class or type to deconstruct
 * @returns {object} Returns an object with the constructor and other functions of the Class.
 */
const deconstruct = type =>
  new Proxy(type, {
    get(_, name) {
      // constructor
      if (name === 'constructor') {
        const constructor = (...args) => ({ ...new type(...args) })
        Object.defineProperty(constructor, 'name', { value: 'constructor', writable: false })
        return constructor
      }

      // all other props
      const prop = findProp(type.prototype, name)
      if (typeof prop !== 'function') {
        return prop
      }

      const func = (thisArg, ...args) => prop.apply(thisArg, args)
      Object.defineProperty(func, 'name', { value: name, writable: false })
      return func
    }
  })

module.exports = {
  deconstruct
}
