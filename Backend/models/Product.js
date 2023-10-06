const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Unit = require("./Unit");
const User = require("./Users");
const Category = require("./Category");
const Brand = require("./Brand");
const TaxRate = require("./TaxRates");

class Products extends Model {}

Products.init(
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
    businessId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("single", "variable"),
      allowNull: false,
    },
    unitId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    brandId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    subcategoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    tax: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    taxType: {
      type: DataTypes.ENUM("inclusive", "exclusive"),
      allowNull: false,
    },
    enableStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    alertQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    barcodeType: {
      type: DataTypes.ENUM(
        "C39",
        "C128",
        "EAN-13",
        "EAN-8",
        "UPC-A",
        "UPC-E",
        "ITF-14"
      ),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    indexes: [
      { fields: ["name"] },
      { fields: ["businessId"] },
      { fields: ["unitId"] },
      { fields: ["userId"] },
    ],
    sequelize,
  }
);

(async () => {
  await Products.sync({ force: true });
})();

Unit.hasMany(Products, { foreignKey: "unitId" });
Products.belongsTo(Unit, {
  foreignKey: "unitId",
  onDelete: "CASCADE",
});

Brand.hasMany(Products, { foreignKey: "brandId" });
Products.belongsTo(Brand, {
  foreignKey: "brandId",
  onDelete: "CASCADE",
});

Category.hasMany(Products, { foreignKey: "categoryId" });
Products.belongsTo(Category, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});

Category.hasMany(Products, { foreignKey: "subcategoryId" });
Products.belongsTo(Category, {
  foreignKey: "subcategoryId",
  onDelete: "CASCADE",
});

TaxRate.hasMany(Products, { foreignKey: "taxId" });
Products.belongsTo(TaxRate, {
  foreignKey: "taxId",
  onDelete: "CASCADE",
});

User.hasMany(Products, { foreignKey: "userId" });
Products.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = Products;
