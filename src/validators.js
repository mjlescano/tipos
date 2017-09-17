const validate = require('validate.js')

const validators = {
  string: validate.isString,
  number: validate.isNumber,
  date: validate.isDate,
  array: validate.isArray,
  object: validate.isHash,
  function: validate.isFunction,
  undefined: (val) => val === undefined
}

const aliases = {
  string: [String, 'String'],
  number: [Number, 'Number'],
  date: [Date, 'Date'],
  array: [Array, 'Array'],
  object: [Object, 'Object'],
  function: [Function, 'Function'],
  undefined: [undefined]
}

// export a combination of validators with aliases
module.exports = Object.keys(validators).reduce((result, type) => {
  const validator = validators[type]

  result[type] = validator

  if (aliases[type]) {
    aliases[type].forEach((alias) => {
      result[alias] = validator
    })
  }

  return result
}, {})
