const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

class Brand extends Model {}

Brand.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },

    description: {
      type: DataTypes.STRING,
    },
    createdBy: {
      type: DataTypes.INTEGER,
    },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  },
  {
    tableName: "brands",
    sequelize,
  }
);

(async () => {
  await Brand.sync({ force: true });
})();

module.exports = Brand;
