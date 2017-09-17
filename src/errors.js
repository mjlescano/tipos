class InvalidArgumentTypeError extends Error {
  constructor (invalidType) {
    const message = `Invalid argument type definition: ${invalidType}`
    super(message)

    this.name = this.constructor.name

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

class InvalidReturnTypeError extends Error {
  constructor (invalidType) {
    const message = `Invalid return type definition: ${invalidType}`
    super(message)

    this.name = this.constructor.name

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

class InvalidArgumentValueError extends Error {
  constructor (expectedType, givenValue) {
    const message = `Invalid argument given. Expected a value of type ${expectedType} and given ${givenValue}.`
    super(message)

    this.name = this.constructor.name

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

class InvalidReturnValueError extends Error {
  constructor (expectedType, givenValue) {
    const message = `Invalid function return value. Expected a value of type ${expectedType} and given ${givenValue}.`
    super(message)

    this.name = this.constructor.name

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

module.exports = {
  InvalidArgumentTypeError,
  InvalidReturnTypeError,
  InvalidArgumentValueError,
  InvalidReturnValueError
}
