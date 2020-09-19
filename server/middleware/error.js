const logger = require('../logger')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    logger.error(err)
    ctx.status = 500
    ctx.body = { message: err.message || 'Ошибка сервера' }
  }
}
