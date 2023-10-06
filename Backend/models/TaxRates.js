const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Business = require("./Business");
const User = require("./Users");

class TaxRates extends Model {}

TaxRates.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    businessId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    groupTaxId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT(8, 2),
      allowNull: false,
    },
    isTaxGroup: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "taxrates",
    paranoid: true,
    sequelize,
  }
);

(async () => {
  await TaxRates.sync({ force: true });
})();

Business.hasMany(TaxRates, { foreignKey: "businessId" });
TaxRates.belongsTo(Business, {
  foreignKey: "businessId",
  onDelete: "CASCADE",
});

User.hasMany(TaxRates, { foreignKey: "userId" });
TaxRates.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = TaxRates;
