"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.trip, {
        as: "trip",
        foreignKey: {
          name: "tripId",
        },
      });
      transaction.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  transaction.init(
    {
      userId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM("waiting for payment", "waiting for approved", "aproved", "canceled"),
        defaultValue: "waiting for payment",
      },
      attachment: DataTypes.STRING,
      tripId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
