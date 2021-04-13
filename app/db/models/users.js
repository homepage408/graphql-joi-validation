"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
      salt: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "supervisor", "planner", "worker"),
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "users",
      paranoid: true,
    }
  );
  return users;
};
