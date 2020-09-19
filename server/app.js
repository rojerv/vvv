const { NODE_ENV, PORT = 3000, JWT } = process.env
const isDev = !(NODE_ENV === 'production')
const logger = require('./logger')

/* KOA server */
const Koa = require('koa')
const koaBody = require('koa-body')
const jwt = require('koa-jwt')
const app = new Koa()

/* middlewares */
app.use(require('./middleware/cors'))
if (isDev) app.use(require('koa-logger')())
app.use(require('./middleware/error'))
app.use(koaBody())

const unprotected = {
  method: 'OPTIONS',
  path: ['/api/v1/auth/login']
}
app.use(jwt({ secret: JWT }).unless(unprotected)) // enable JWT


app.use(require('./api').routes()) // API enable
app.use(require('./api').allowedMethods()) // OPTIONS requests

app.listen(PORT, () => logger.info(`API STARTED AT http://localhost:${PORT}/`))
