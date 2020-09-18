const isDev = !(process.env.NODE_ENV === 'production')
const PORT = process.env.PORT || 3000

/* KOA server */
const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()

if (isDev) app.use(require('koa-logger')())

app.listen(PORT, () => console.log(`API STARTED AT http://localhost:${PORT}/`))
