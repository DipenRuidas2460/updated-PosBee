const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

class TaxRates extends Model {}

TaxRates.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isTaxGroup: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    createdBy: {
      type: DataTypes.INTEGER,
    },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  },
  {
    tableName: "taxrates",
    sequelize,
  }
);

(async () => {
  await TaxRates.sync({ force: true });
})();

module.exports = TaxRates;
