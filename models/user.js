"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.transaction, {
        as: "transaction",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      profile: DataTypes.STRING,
      role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
