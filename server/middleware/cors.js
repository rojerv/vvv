module.exports = async (ctx, next) => {
  await next()
  ctx.set('Access-Control-Allow-Origin', process.env.CORS || '*')
  ctx.set('Access-Control-Allow-Credentials', 'true')
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  ctx.set('Access-Control-Max-Age', 600)
}
