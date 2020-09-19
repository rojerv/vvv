const { Task } = require('../db')

module.exports.findAll = async (UserId) => {
  return Task.findAll({ where: { UserId }, order: [['id', 'ASC']] })
}

module.exports.create = async (UserId, data) => {
  return Task.create({ ...data, UserId })
}

module.exports.changeStatus = async (UserId, taskID) => {
  return Task.update({ done: true }, { where: { id: taskID, UserId } })
}
