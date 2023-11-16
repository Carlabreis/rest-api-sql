const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  emailAddress: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
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