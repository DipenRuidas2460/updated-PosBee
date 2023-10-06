const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Transaction = require("./Transaction");

class TransactionPayment extends Model {}

TransactionPayment.init(
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
    amount: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0,
    },
    method: {
      type: DataTypes.ENUM("cash", "card", "cheque", "bank_transfer", "other"),
      allowNull: false,
    },
    cardTransactionNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardType: {
      type: DataTypes.ENUM("visa", "master"),
      allowNull: true,
    },
    cardHolderName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardMonth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardYear: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardSecurity: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    chequeNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bankAccountNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "transactionpayments",
    indexes: [{ fields: ["transactionId"] }],
    sequelize,
  }
);

(async () => {
  await TransactionPayment.sync({ force: true });
})();

Transaction.hasMany(TransactionPayment, { foreignKey: "transactionId" });
TransactionPayment.belongsTo(Transaction, {
  foreignKey: "transactionId",
  onDelete: "CASCADE",
});

module.exports = TransactionPayment;
