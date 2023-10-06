const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Products = require("./Product");
const Transaction = require("./Transaction");
const Variation = require("./Variation");
const TaxRates = require("./TaxRates");

class PurchaseLine extends Model {}

PurchaseLine.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    variationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchasePrice: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    purchasePriceIncTax: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0,
    },
    itemTax: {
      type: DataTypes.DECIMAL(8, 2),
      comment: "Tax for one quantity",
    },
    taxId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    tableName: "purchaselines",
    indexes: [
      { fields: ["transactionId"] },
      { fields: ["productId"] },
      { fields: ["variationId"] },
      { fields: ["taxId"] },
    ],
    sequelize,
  }
);

(async () => {
  await PurchaseLine.sync({ force: true });
})();

Transaction.hasMany(PurchaseLine, { foreignKey: "transactionId" });
PurchaseLine.belongsTo(Transaction, {
  foreignKey: "transactionId",
  onDelete: "CASCADE",
});

Products.hasMany(PurchaseLine, { foreignKey: "productId" });
PurchaseLine.belongsTo(Products, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

Variation.hasMany(PurchaseLine, { foreignKey: "variationId" });
PurchaseLine.belongsTo(Variation, {
  foreignKey: "variationId",
  onDelete: "CASCADE",
});

TaxRates.hasMany(PurchaseLine, { foreignKey: "taxId" });
PurchaseLine.belongsTo(TaxRates, {
  foreignKey: "taxId",
  onDelete: "CASCADE",
});

module.exports = PurchaseLine;
