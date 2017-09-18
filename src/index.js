const { hasValues } = require('./utils')
const validators = require('./validators')
const {
  InvalidArgumentTypeError,
  InvalidReturnTypeError,
  InvalidArgumentValueError,
  InvalidReturnValueError
} = require('./errors')

function createInterface (argsTypes = [], returnType = undefined) {
  for (const argType of argsTypes) {
    if (!validateType(argType)) {
      throw new InvalidArgumentTypeError(argType)
    }
  }

  if (!validateType(returnType)) {
    throw new InvalidReturnTypeError(returnType)
  }

  return function wrapInterface (fn) {
    if (typeof fn !== 'function') {
      throw new Error('Only functions can be wrapped')
    }

    return function validateInterface (...args) {
      if (argsTypes.length === 0 && hasValues(args)) {
        throw new InvalidArgumentValueError(undefined, args)
      }

      argsTypes.forEach((argType, index) => {
        const value = args[index]

        if (!validate(argType, value)) {
          throw new InvalidArgumentValueError(argType, value)
        }
      })

      const result = fn(...args)

      if (!validate(returnType, result)) {
        throw new InvalidReturnValueError(returnType, result)
      }

      return result
    }
  }
}

function getTypes (type) {
  if (typeof type === 'string') {
    let hasOptional = false

    const types = type.split('|').map((type) => {
      if (type.endsWith('?')) {
        hasOptional = true
        return type.slice(0, -1)
      }

      return type
    })

    if (hasOptional) types.push(undefined)

    return types
  } else {
    return [type]
  }
}

function validateType (type) {
  const types = getTypes(type)
  return types.every((type) => validators.hasOwnProperty(type))
}

function validate (type, value) {
  return getTypes(type).some((type) => validators[type](value))
}

module.exports = function tipos (...argsTypes) {
  const Types = createInterface(argsTypes)

  Types.returns = function returns (returnType) {
    return createInterface(argsTypes, returnType)
  }

  return Types
}

Object.assign(module.exports, {
  createInterface,
  validators,
  validate
})
