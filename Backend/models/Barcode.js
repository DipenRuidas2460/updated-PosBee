const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Business = require("./Business");

class Barcode extends Model {}

Barcode.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    width: {
      type: DataTypes.FLOAT(8, 2),
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT(8, 2),
      allowNull: true,
    },
    paperWidth: {
      type: DataTypes.FLOAT(8, 2),
      allowNull: true,
    },
    paperHeight: {
      type: DataTypes.FLOAT(8, 2),
      allowNull: true,
    },
    topMargin: {
      type: DataTypes.FLOAT(8, 2),
      allowNull: true,
    },
    leftMargin: {
      type: DataTypes.FLOAT(8, 2),
      allowNull: true,
    },
    rowDistance: {
      type: DataTypes.FLOAT(8, 2),
      allowNull: true,
    },
    colDistance: {
      type: DataTypes.FLOAT(8, 2),
      allowNull: true,
    },
    stickersInOneRow: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    isContinuous: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    stickersInOneSheet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    businessId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    tableName: "barcodes",
    indexes: [{ fields: ["businessId"] }],
    sequelize,
  }
);

(async () => {
  await Barcode.sync({ force: true });
})();

Business.hasMany(Barcode, { foreignKey: "businessId" });
Barcode.belongsTo(Business, {
  foreignKey: "businessId",
  onDelete: "CASCADE",
});

module.exports = Barcode;
