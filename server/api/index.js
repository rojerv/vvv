const UserService = require('../services/UserService')
const TaskService = require('../services/TaskService')
const { PREFIX } = process.env

const Router = require('koa-router')
const Api = new Router({ prefix: PREFIX })

Api
  .post('/auth/login', async ctx => {
    try {
      const token = await UserService.login(ctx.request.body)
      ctx.body = { token }
    } catch (error) {
      ctx.status = 401
      ctx.body = { message: error.message }
    }
  })
  .get('/auth/user', async ctx => {
    try {
      const { login } = ctx.state.user
      const user = await UserService.find(login)
      ctx.body = { user }
    } catch (error) {
      ctx.status = 401
      ctx.body = { message: error.message }
    }
  })
  .get('/tasks', async ctx => {
    const { id } = ctx.state.user
    const tasks = await TaskService.findAll(id)
    ctx.body = { tasks }
  })
  .post('/tasks', async ctx => {
    try {
      const { id } = ctx.state.user
      const newTask = await TaskService.create(id, ctx.request.body)
      ctx.body = newTask
    } catch (error) {
      ctx.body = { message: error.message, status: 'error' }
    }
  })
  .patch('/tasks/:id', async ctx => {
    try {
      const { id } = ctx.state.user
      const updatedTask = await TaskService.changeStatus(id, ctx.params.id)
      ctx.body = updatedTask
    } catch (error) {
      ctx.body = { message: error.message, status: 'error' }
    }
  })

module.exports = Api
