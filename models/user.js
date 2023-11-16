'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class User extends Model {}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'First name is required',
      },
      notEmpty: {
        msg: 'Please provide a first name',
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Last name is required',
      },
      notEmpty: {
        msg: 'Please provide a last name',
      },
    },
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Email is required',
      },
      notEmpty: {
        msg: 'Please provide an email',
      },
      isEmail: {
        msg: "Must be a valid email address",
      }
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
        const hashedPassword = bcrypt.hashSync(val, 10);
        this.setDataValue('password', hashedPassword);
      },
      validate: {
        notNull: {
          msg: 'A password is required',
        },
        notEmpty: {
          msg: 'Please provide a password',
        },
        // len: {
        //   args: [8, 20],
        //   msg: 'The password should be between 8 and 20 characters in length',
        // },
      },
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

User.associate = (models) => {
    // TODO Add associations.
    User.hasMany(models.Course, {
    //   as: 'course', // alias
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };

return User;
};