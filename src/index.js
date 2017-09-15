const validators = require('./validators')
const {
  InvalidTypeError,
  InvalidValueError
} = require('./errors')

/*
const Types = tipos(String, Number).returns(undefined)

module.exports = Types((string, theNumber) => {
  console.log(string, theNumber)
})
*/

module.exports = function tipos (...argsTypes) {
  const interfaze = createInterface(argsTypes)

  interfaze.returns = function returns (returnType) {
    return createInterface(argsTypes, returnType)
  }

  return interfaze
}

function createInterface (argsTypes = [], returnType = undefined) {
  for (const argType of argsTypes) {
    if (!validators.hasOwnProperty(argType)) {
      throw new InvalidTypeError(argType)
    }
  }

  if (!validators.hasOwnProperty(returnType)) {
    throw new InvalidTypeError(returnType)
  }

  return function wrapInterface (fn) {
    return function validateInterface (...args) {
      if (argsTypes.length === 0 && args.length > 0) {
        throw new InvalidValueError(undefined, undefined)
      }

      argsTypes.forEach((argType, index) => {
        const value = args[index]

        if (!validators[argType](value)) {
          throw new InvalidValueError(argType, value)
        }
      })

      const result = fn(...args)

      if (!validators[returnType](result)) {
        throw new InvalidValueError(returnType, result)
      }

      return result
    }
  }
}

module.exports.createInterface = createInterface
