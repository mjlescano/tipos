const { defineSupportCode } = require('cucumber')
const tipos = require('../../src')

defineSupportCode(({ Given, When, Then }) => {
  Given('a function that takes no args and returns void', () => {
    return tipos(() => { })
  })
})
