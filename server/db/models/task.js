module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    text: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Введите текст задачи'
        }
      }
    },
    done: DataTypes.BOOLEAN
  }, {})

  Task.associate = function(models) {
    Task.belongsTo(models.User)
  }

  return Task
}
