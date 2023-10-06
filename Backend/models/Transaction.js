const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Contacts = require("./Contact");
const TaxRates = require("./TaxRates");
const User = require("./Users");

class Transaction extends Model {}

Transaction.init(
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
    type: {
      type: DataTypes.ENUM("purchase", "sell"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("received", "pending", "ordered", "draft", "final"),
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM("paid", "due"),
      allowNull: false,
    },
    contactId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    invoiceNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalBeforeTax: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0,
      comment:
        "Total before the purchase/invoice tax, this includes the individual product tax",
    },
    taxId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    taxAmount: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0,
    },
    discountType: {
      type: DataTypes.ENUM("fixed", "percentage"),
      allowNull: true,
    },
    discountAmount: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    shipping_details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shippingCharges: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0,
    },
    additionalNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    staffNote: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    finalTotal: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "transactions",
    indexes: [
      { fields: ["businessId"] },
      { fields: ["type"] },
      { fields: ["contactId"] },
      { fields: ["transactionDate"] },
      { fields: ["userId"] },
    ],
    sequelize,
  }
);

(async () => {
  await Transaction.sync({ force: true });
})();

Contacts.hasMany(Transaction, { foreignKey: "contactId" });
Transaction.belongsTo(Contacts, {
  foreignKey: "contactId",
  onDelete: "CASCADE",
});

TaxRates.hasMany(Transaction, { foreignKey: "taxId" });
Transaction.belongsTo(TaxRates, {
  foreignKey: "taxId",
  onDelete: "CASCADE",
});

User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = Transaction;
