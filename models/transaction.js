"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Trip, {
        as: "trip",
        foreignKey: {
          name: "idTrip",
        },
      });
      Transaction.belongsTo(models.User, {
        as: "userTransaction",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  Transaction.init(
    {
      idTrip: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
      transferProof: DataTypes.STRING,
      paymentStatus: {
        type: DataTypes.ENUM("pending", "aproved", "canceled"),
        defaultValue: "pending",
      },
      qty: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
