const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/dbConfig");

// const package = require("./package");

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prefix: {
      type: Sequelize.ENUM,
      values: ["Mr", "Mrs", "Miss"],
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      require: true,
    },
    language: {
      type: Sequelize.ENUM,
      values: [
        "English",
        "Spanish - Espanol",
        "Albanian - Shqip",
        "Hindi",
        "Dutch",
        "French - Francais",
        "German - Deutsch",
        "Arabic",
      ],
    },
    fpToken: {
      type: DataTypes.STRING,
    },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  },
  {
    tableName: "users",
    sequelize,
  }
);

(async () => {
  await User.sync({ force: true });
})();

// User.hasOne(package, {
//   foreignKey: "subscriptionType",
//   sourceKey: "subscriptionType",
// });

module.exports = User;
