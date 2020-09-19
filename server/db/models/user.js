const { hashPassword, verifyPassword } = require('../../utils/hash')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Введите логин'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Введите пароль'
        }
      }
    }
  }, {})

  User.associate = function(models) {
    User.hasMany(models.Task)
  }

  User.beforeCreate(async user => {
    user.password = await hashPassword(user.password)
  })

  User.prototype.verifyPassword = async function (password) {
    return verifyPassword(password, this.password)
  }

  return User
}
