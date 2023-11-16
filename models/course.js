const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model {}

Course.init({
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  estimatedTime: {
    type: DataTypes.STRING
  },
  materialsNeeded: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Course' // We need to choose the model name
});

Course.associate = (models) => {
    // TODO Add associations.
    Course.belongsTo(models.User, {
    //   as: 'course', // alias
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };

return Course;
};