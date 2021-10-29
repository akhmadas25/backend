'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Trip.belongsTo(models.Country),{
        as: "countryId",
        foreignKey: {
          name: "idCountry" 
        }
      }
    }
  };
  Trip.init({
    title: DataTypes.STRING,
    idCountry: DataTypes.INTEGER,
    picture1: DataTypes.STRING,
    picture2: DataTypes.STRING,
    picture3: DataTypes.STRING,
    picture4: DataTypes.STRING,
    accomodation: DataTypes.STRING,
    eat: DataTypes.STRING,
    transportation: DataTypes.STRING,
    day: DataTypes.INTEGER,
    night: DataTypes.INTEGER,
    dateTrip: DataTypes.DATE,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};