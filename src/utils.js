module.exports.hasValues = (arr = []) => {
  return arr.filter((val) => val !== undefined).length > 0
}
