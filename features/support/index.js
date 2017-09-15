const assert = require('assert')
const { defineSupportCode } = require('cucumber')
const tipos = require('../../src')
const validators = require('../../src/validators')

defineSupportCode(({ Given, When, Then }) => {
  Given('a function that takes( no) argument(s)', () => {
    this.Types = tipos()
  })

  Given('returns( a)( an) {word}', (type) => {
    this.Types = this.Types.returns(type)
  })

  When('called with no arguments', () => {
    this.fn = this.Types(() => {})

    try {
      this.result = this.fn()
    } catch (err) {
      this.err = err
    }
  })

  When('called with argument {int}', (int) => {
    try {
      this.result = this.fn(int)
    } catch (err) {
      this.err = err
    }
  })

  Then('it returns( a)( an) {word}', (type) => {
    assert(validators[type](this.result))
  })

  Then('it throws( an) {word}', (errorName) => {
    assert.equal(this.err.name, errorName)
  })
})
