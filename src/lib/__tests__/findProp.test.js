const { findProp } = require('../findProp')

class BaseMock {
  baseMockFunction() {
    return 'baseMockFunction'
  }
}

class Mock extends BaseMock {
  mockFunction() {
    return 'mockFunction'
  }
}

describe('lib/findProp', () => {
  test('when object is null returns undefined', () => {
    const expected = undefined
    const actual = findProp(null, 'any')
    expect(actual).toBe(expected)
  })

  test('property is found', () => {
    const expected = 'success'
    const actual = findProp({ expected }, 'expected')
    expect(actual).toBe(expected)
  })

  test('property is found on object', () => {
    const expected = 'success'
    const actual = findProp({ expected }, 'expected')
    expect(actual).toBe(expected)
  })

  test('property is on Class', () => {
    const expected = Object.getPrototypeOf(Mock).mockFunction
    const actual = findProp(Mock, 'mockFunction')
    expect(actual).toBe(expected)
  })

  test('property is on base Class', () => {
    const expected = Object.getPrototypeOf(BaseMock).baseMockFunction
    const actual = findProp(Mock, 'baseMockFunction')
    expect(actual).toBe(expected)
  })
})
