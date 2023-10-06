const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Business = require("./Business");

class Invoice extends Model {}

Invoice.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schemeType: {
      type: DataTypes.ENUM("blank", "year"),
      allowNull: false,
    },
    prefix: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    invoiceCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalDigits: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "invoices",
    sequelize,
  }
);

(async () => {
  await Invoice.sync({ force: true });
})();

Business.hasMany(Invoice, { foreignKey: "businessId" });
Invoice.belongsTo(Business, {
  foreignKey: "businessId",
  onDelete: "CASCADE",
});

module.exports = Invoice;
