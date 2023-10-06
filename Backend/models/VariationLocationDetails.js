const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Variation = require("./Variation");
const BusinessLocation = require("./BusinessLocation");
const Products = require("./Product");
const ProductVariation = require("./ProductVariation");

class VariationLocationDetails extends Model {}

VariationLocationDetails.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    productVariationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: "Id from productVariations table",
      allowNull: false,
    },
    variationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    qtyAvailable: {
      type: DataTypes.DECIMAL(8, 2),
    },
  },
  {
    tableName: "variationlocationdetails",
    indexes: [
      { fields: ["productId"] },
      { fields: ["productVariationId"] },
      { fields: ["variationId"] },
    ],
    sequelize,
  }
);

(async () => {
  await VariationLocationDetails.sync({ force: true });
})();

Products.hasMany(VariationLocationDetails, { foreignKey: "productId" });
VariationLocationDetails.belongsTo(Products, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

ProductVariation.hasMany(VariationLocationDetails, {
  foreignKey: "productVariationId",
});
VariationLocationDetails.belongsTo(ProductVariation, {
  foreignKey: "productVariationId",
  onDelete: "CASCADE",
});

Variation.hasMany(VariationLocationDetails, { foreignKey: "variationId" });
VariationLocationDetails.belongsTo(Variation, {
  foreignKey: "variationId",
  onDelete: "CASCADE",
});

BusinessLocation.hasMany(VariationLocationDetails, {
  foreignKey: "locationId",
});
VariationLocationDetails.belongsTo(BusinessLocation, {
  foreignKey: "locationId",
  onDelete: "CASCADE",
});

module.exports = VariationLocationDetails;