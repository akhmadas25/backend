"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trip.belongsTo(models.country, {
        as: "country",
        foreignKey: {
          name: "idCountry",
        },
      });
      trip.hasMany(models.transaction, {
        as: "transaction",
        foreignKey: {
          name: "tripId",
        },
      });
    }
  }
  trip.init(
    {
      title: DataTypes.STRING,
      idCountry: DataTypes.INTEGER,
      accomodation: DataTypes.STRING,
      transportation: DataTypes.STRING,
      eat: DataTypes.STRING,
      day: DataTypes.INTEGER,
      night: DataTypes.INTEGER,
      date: DataTypes.STRING,
      price: DataTypes.INTEGER,
      desc: DataTypes.STRING,
      quota: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "trip",
    }
  );
  return trip;
};
