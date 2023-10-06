const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Business = require("./Business");

class ExpenseCategory extends Model {}

ExpenseCategory.init(
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
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "expensecategories",
    sequelize,
  }
);

(async () => {
  await ExpenseCategory.sync({ force: true });
})();

Business.hasMany(ProductVariation, { foreignKey: "businessId" });
ExpenseCategory.belongsTo(Business, {
  foreignKey: "businessId",
  onDelete: "CASCADE",
});

module.exports = ExpenseCategory;
