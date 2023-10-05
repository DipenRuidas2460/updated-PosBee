const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/dbConfig");

class Business extends Model {}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    taxNumber1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxLabel1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxNumber2: {
      type: DataTypes.STRING,
    },
    taxLabel2: {
      type: DataTypes.STRING,
    },
    defaultProfitPercent: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true,
    },
    timeZone: {
      type: DataTypes.STRING,
      defaultValue: "Asia/Kolkata",
    },
    fyStartMonth: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    accountingMethod: {
      type: Sequelize.ENUM,
      values: ["fifo", "lifo", "avco"],
      defaultValue: "fifo",
    },
    defaultSalesDiscount: {
      type: DataTypes.DECIMAL,
    },
    sellPriceTax: {
      type: Sequelize.ENUM,
      values: ["includes", "excludes"],
      defaultValue: "includes",
    },
    logo: {
      type: DataTypes.STRING,
    },
    skuPrefix: {
      type: DataTypes.STRING,
    },
    enableTooltip: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    tableName: "businesses",
    sequelize,
  }
);

(async () => {
  await Business.sync({ force: true });
})();

module.exports = Business;
