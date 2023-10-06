const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Business = require("./Business");

class InvoiceLayout extends Model {}

InvoiceLayout.init(
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
    headerText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    invoiceNoPrefix: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoiceHeading: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subTotalLabel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discountLabel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taxLabel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalLabel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    showLogo: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    showBusinessName: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    showLocationName: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    showLandmark: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    showCity: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    showState: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    showzipCode: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    showCountry: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    showMobileNumber: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    showAlternateNumber: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    showEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    showTax1: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    showTax2: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    showBarcode: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    highlightColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    footerText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    businessId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "invoicelayouts",
    sequelize,
  }
);

(async () => {
  await InvoiceLayout.sync({ force: true });
})();

Business.hasMany(ProductVariation, { foreignKey: "businessId" });
InvoiceLayout.belongsTo(Business, {
  foreignKey: "businessId",
  onDelete: "CASCADE",
});

module.exports = InvoiceLayout;
