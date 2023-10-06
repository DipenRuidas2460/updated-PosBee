const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/dbConfig");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prefix: {
      type: DataTypes.ENUM("Mr", "Mrs", "Miss"),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    language: {
      type: DataTypes.ENUM(
        "English",
        "Spanish - Espanol",
        "Albanian - Shqip",
        "Hindi",
        "Dutch",
        "French - Francais",
        "German - Deutsch",
        "Arabic"
      ),
      allowNull: false,
    },
    fpToken: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    paranoid: true,
    sequelize,
  }
);

(async () => {
  await User.sync({ force: true });
})();

module.exports = User;
