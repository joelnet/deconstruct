const { deconstruct } = require('../deconstruct')

class MyClass {
  constructor(value) {
    this.value = value
  }
  getValue() {
    return this.value
  }
}

function Es5Class(value) {
  this.value = value
}
Es5Class.prototype.someProperty = 123
Es5Class.prototype.getValue = function getValue() {
  return this.value
}

describe('deconstruct', () => {
  test('deconstructs constructor', () => {
    const expected = new MyClass('Akira Kurosawa')
    const { constructor } = deconstruct(MyClass)
    const actual = constructor('Akira Kurosawa')
    expect(actual).toMatchObject(expected)
  })

  test('deconstructs functions', () => {
    const myClass = new MyClass('Akira Kurosawa')
    const expected = myClass.getValue()
    const { constructor, getValue } = deconstruct(MyClass)
    const object = constructor('Akira Kurosawa')
    const actual = getValue(object)
    expect(actual).toBe(expected)
  })

  test('deconstructs ES5 functions', () => {
    const myClass = new Es5Class('Akira Kurosawa')
    const expected = myClass.getValue()
    const { constructor, getValue } = deconstruct(Es5Class)
    const object = constructor('Akira Kurosawa')
    const actual = getValue(object)
    expect(actual).toBe(expected)
  })

  test.only('deconstructs ES5 properties', () => {
    const { someProperty } = deconstruct(Es5Class)
    const expected = Es5Class.prototype.someProperty
    expect(someProperty).toBe(expected)
  })
})
