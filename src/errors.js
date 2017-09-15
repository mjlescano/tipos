class InvalidTypeError extends Error {
  constructor (invalidType) {
    const message = `Invalid type definition: ${invalidType}`
    super(message)

    this.name = this.constructor.name

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

class InvalidValueError extends Error {
  constructor (expectedType, givenValue) {
    const message = `Invalid argument given. Expected a values of type ${expectedType} and given ${givenValue}.`
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
  InvalidTypeError,
  InvalidValueError
}
