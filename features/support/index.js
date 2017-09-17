const assert = require('assert')
const { defineSupportCode } = require('cucumber')
const tipos = require('../../src')
const validators = require('../../src/validators')

const mock = {
  String: () => '',
  Number: () => 2,
  Date: () => new Date(),
  Array: () => [],
  Object: () => {},
  Function: () => () => {},
  undefined: () => undefined
}

defineSupportCode(({ defineParameterType, Given, When, Then }) => {
  defineParameterType({
    typeName: 'validators',
    regexp: /nothing|\((.+)\)/,
    transformer: (str) => {
      if (!str) return [undefined]
      return str.split(', ')
    }
  })

  defineParameterType({
    typeName: 'validator',
    regexp: /(nothing|.+)/,
    transformer: (str) => {
      if (str === 'nothing') return undefined
      return str
    }
  })

  defineParameterType({
    typeName: 'arguments',
    regexp: /no arguments|\((.+)\)/,
    transformer: (str) => {
      if (!str) return [undefined]
      return JSON.parse(`[${str}]`)
    }
  })

  Given('(a function that )takes {validators}', (types) => {
    this.Types = tipos(...types)
    this.fn = this.Types(() => {})
  })

  Given('(a function that )returns {validator}', (type) => {
    this.Types = this.Types.returns(type)
    this.fn = this.Types(() => mock[type]())
  })

  When('called with {arguments}', (args) => {
    this.args = args
  })

  Then('it returned( a) {validator}', (type) => {
    const result = this.fn(...this.args)
    assert(validators[type](result))
  })

  Then('it threw {word}', (errorName) => {
    try {
      this.fn(...this.args)
    } catch (err) {
      assert.equal(err.name, errorName)
    }
  })
})
