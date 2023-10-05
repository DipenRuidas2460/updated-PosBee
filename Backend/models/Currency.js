const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

class Currency extends Model { }

Currency.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thousandSeparator: {
      type: DataTypes.STRING,
    },
    decimalSeparator: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "currencies",
    sequelize,
  }
);

(async () => {
  await Currency.sync({ force: true });
})();

module.exports = Currency;
