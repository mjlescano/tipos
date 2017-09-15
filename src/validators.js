const validate = require('validate.js')

const validators = module.exports = {
  [String]: validate.isString,
  [Number]: validate.isNumber,
  [Date]: validate.isDate,
  [Array]: validate.isArray,
  [Object]: validate.isHash,
  [undefined]: (val) => val === undefined
}

Object.assign(validators, {
  'String': validators[String],
  'Number': validators[Number],
  'Date': validators[Date],
  'Array': validators[Array],
  'Object': validators[Object],
  'undefined': validators[undefined]
})
