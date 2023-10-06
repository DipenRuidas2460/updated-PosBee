const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require('./Users')
const Currency = require('./Currency')

class Business extends Model {}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    currencyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    taxNumber1: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    taxLabel1: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    taxNumber2: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    taxLabel2: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    defaultProfitPercent: {
      type: DataTypes.FLOAT(5, 2),
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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
      type: DataTypes.ENUM("fifo", "lifo", "avco"),
      defaultValue: "fifo",
    },
    defaultSalesDiscount: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    sellPriceTax: {
      type: DataTypes.ENUM("includes", "excludes"),
      defaultValue: "includes",
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    skuPrefix: {
      type: DataTypes.STRING,
      allowNull: true,
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

User.hasMany(Business, {foreignKey: 'userId',})
Business.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Currency.hasMany(Business, {foreignKey: 'currencyId',})
Business.belongsTo(Currency, {
  foreignKey: 'currencyId',
  onDelete: 'CASCADE',
});

module.exports = Business;
