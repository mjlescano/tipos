const validators = require('./validators')
const {
  InvalidArgumentTypeError,
  InvalidReturnTypeError,
  InvalidArgumentValueError,
  InvalidReturnValueError
} = require('./errors')

/*
const Types = tipos(String, Number).returns(undefined)

module.exports = Types((string, theNumber) => {
  console.log(string, theNumber)
})
*/

function createInterface (argsTypes = [], returnType = undefined) {
  for (const argType of argsTypes) {
    if (!validators.hasOwnProperty(argType)) {
      throw new InvalidArgumentTypeError(argType)
    }
  }

  if (!validators.hasOwnProperty(returnType)) {
    throw new InvalidReturnTypeError(returnType)
  }

  return function wrapInterface (fn) {
    return function validateInterface (...args) {
      if (argsTypes.length === 0 && args.length > 0) {
        throw new InvalidArgumentValueError(undefined, undefined)
      }

      argsTypes.forEach((argType, index) => {
        const value = args[index]

        if (!validators[argType](value)) {
          throw new InvalidArgumentValueError(argType, value)
        }
      })

      const result = fn(...args)

      if (!validators[returnType](result)) {
        throw new InvalidReturnValueError(returnType, result)
      }

      return result
    }
  }
}

module.exports = function tipos (...argsTypes) {
  const Types = createInterface(argsTypes)

  Types.returns = function returns (returnType) {
    return createInterface(argsTypes, returnType)
  }

  return Types
}

module.exports.createInterface = createInterface
module.exports.validators = validators
