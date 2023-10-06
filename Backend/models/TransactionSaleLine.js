const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Products = require("./Product");
const Variation = require("./Variation");
const TaxRates = require("./TaxRates");
const Transaction = require("./Transaction");

class TransactionSellLine extends Model {}

TransactionSellLine.init(
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
    unitPrice: {
      type: DataTypes.DECIMAL(8, 2),
      comment: "Sell price excluding tax",
      allowNull: true,
    },
    unitPriceIncTax: {
      type: DataTypes.DECIMAL(8, 2),
      comment: "Sell price including tax",
      allowNull: true,
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
    tableName: "transactionsellines",
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
  await TransactionSellLine.sync({ force: true });
})();

Transaction.hasMany(TransactionSellLine, { foreignKey: "transactionId" });
TransactionSellLine.belongsTo(Transaction, {
  foreignKey: "transactionId",
  onDelete: "CASCADE",
});

Products.hasMany(TransactionSellLine, { foreignKey: "productId" });
TransactionSellLine.belongsTo(Products, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

Variation.hasMany(TransactionSellLine, { foreignKey: "variationId" });
TransactionSellLine.belongsTo(Variation, {
  foreignKey: "variationId",
  onDelete: "CASCADE",
});

TaxRates.hasMany(TransactionSellLine, { foreignKey: "taxId" });
TransactionSellLine.belongsTo(TaxRates, {
  foreignKey: "taxId",
  onDelete: "CASCADE",
});

module.exports = TransactionSellLine;
