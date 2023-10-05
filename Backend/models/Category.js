const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true,
    },
    shortCode: {
      type: DataTypes.STRING,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
    },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  },
  {
    tableName: "categories",
    sequelize,
  }
);

(async () => {
  await Category.sync({ force: true });
})();

module.exports = Category;
