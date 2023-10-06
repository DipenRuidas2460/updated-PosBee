const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Products = require("./Product");

class ProductVariation extends Model {}

ProductVariation.init(
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
    isDummy: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    tableName: "variations",
    indexes: [{ fields: ["name"] }, { fields: ["productId"] }],
    sequelize,
  }
);

(async () => {
  await ProductVariation.sync({ force: true });
})();

Products.hasMany(ProductVariation, { foreignKey: "productId" });
ProductVariation.belongsTo(Products, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

module.exports = ProductVariation;