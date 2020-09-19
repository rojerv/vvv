const { User } = require('../db')
const { JWT_EXP_DAYS, JWT } = process.env
const jsonwebtoken = require('jsonwebtoken')

module.exports.login = async ({ login, password }) => {
  let user = await User.findOne({ where: { login } })

  if (user) {
    const verifyPassword = await user.verifyPassword(password)
    if (!verifyPassword) throw new Error('Неверный пароль')
  } else {
    user = await User.create({ login, password })
  }

  const data = {
    id: user.id,
    login,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * JWT_EXP_DAYS)
  }

  const accessToken = jsonwebtoken.sign(data, JWT)
  return accessToken
}

module.exports.find = async (login) => {
  const user = await User.findOne({ where: { login } })

  if (!user) throw new Error('Пользователь не найден')

  return { id: user.id, login: user.login }
}
