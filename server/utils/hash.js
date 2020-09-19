const crypto = require('crypto')
const util = require('util')
const pbkdf2 = util.promisify(crypto.pbkdf2)
const randomBytes = util.promisify(crypto.randomBytes)

const config = {
  hashBytes: 64,
  saltBytes: 16,
  iterations: 500000,
  algo:'sha512',
  encoding: 'base64'
}

async function hashPassword(password) {
  let salt = (await randomBytes(config.saltBytes)).toString(config.encoding)
  let hash = (await pbkdf2(password, salt, config.iterations, config.hashBytes, config.algo)).toString(config.encoding)
  return [salt, hash].join('$')
}

async function verifyPassword(password, hash) {
  const [salt, originalHash] = hash.split('$')
  let userHash = (await pbkdf2(password, salt, config.iterations, config.hashBytes, config.algo)).toString(config.encoding)
  return userHash === originalHash
}

module.exports = { hashPassword, verifyPassword }
