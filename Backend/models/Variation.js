const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Products = require("./Product");
const ProductVariation = require("./ProductVariation");

class Variation extends Model {}

Variation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    subSku: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productVariationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    defaultPurchasePrice: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
    dppIncTax: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0,
    },
    profitPercent: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0,
    },
    defaultSellPrice: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
    sellPriceIncTax: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      comment: "Sell price including tax",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "variations",
    paranoid: true,
    indexes: [{ fields: ["name"] }, { fields: ["subSku"] }],
    sequelize,
  }
);

(async () => {
  await Variation.sync({ force: true });
})();

Products.hasMany(Variation, { foreignKey: "productId" });
Variation.belongsTo(Products, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

ProductVariation.hasMany(Variation, { foreignKey: "productVariationId" });
Variation.belongsTo(ProductVariation, {
  foreignKey: "productVariationId",
  onDelete: "CASCADE",
});

module.exports = Variation;
