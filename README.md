# deconstruct

For those that prefer using Functions over Classes.

## Install

```
npm i https://github.com/joelnet/deconstruct.git
```

## Usage

Given a Class:

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
```

Pass your Class to `deconstruct`. Use destructuring to access the `constructor` and any methods attached to the Class.

```javascript
// deconstruct and destructure the Person Class
const { constructor: createPerson, getFullName } = deconstruct(Person)

// create a new Person
const person = createPerson('Akira', 'Kurosawa')
//=> { firstName: 'Akira', lastName: 'Kurosawa' }

// call the getFullName function with our person
const fullName = getFullName(person)
//=> "Akira Kurosawa"
```

## Benefits

- No more problems with `this` being assigned to something else.

- Functions can be used by other parts of the application, not just the Class.

- Encourages composition over inheritance.

## Caveats

This cannot be used with code that relies on `instanceof`. Because the deconstructed objects are Plain Old JavaScript Objects, `instanceof` will always be `Object`.

## ES5 Classes

Works the same with ES5 Classes

```javascript
function Person() {
  this.firstName = firstName
  this.lastName = lastName
}

Person.prototype.getFullName = function getFullName() {
  return `${this.firstName} ${this.lastName}`
}

// deconstruct and destructure the Person Class
const { constructor: createPerson, getFullName } = deconstruct(Person)
```

## Static Methods

Static methods are already functions, just use them.

```javascript
class Person {
  static getType() {
    return 'Person'
  }
}

Person.getType()
//=> 'Person'
```

## Ideas

### Export Functions not Classes

have more control over how your Classes are used. Export Functions and not the Class.

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

// deconstruct and destructure the Person Class
const { constructor: createPerson, getFullName } = deconstruct(Person)

module.exports = {
  createPerson,
  getFullName
}
```

### Prevent `this` bugs

Typical `this` bug:

```javascript
// destructuring changes the `this` context.
const logFullName = ({ getFullName }) => console.log(`fullname: ${getFullName()}`)

const person = new Person('Akira', 'Kurosawa')
logFullName(person)
//=> Cannot read property 'firstName' of undefined
```

Instead write:

```javascript
// no more bugs with `this`
const logFullName = context => console.log(`fullname: ${getFullName(context)}`)

const person = createPerson('Akira', 'Kurosawa')
logFullName(person)
//=> fullname: Akira Kurosawa
```
