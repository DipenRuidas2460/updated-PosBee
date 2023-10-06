const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Business = require("./Business");
const User = require("./Users");

class Brand extends Model {}

Brand.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "brands",
    paranoid: true,
    sequelize,
  }
);

(async () => {
  await Brand.sync({ force: true });
})();

Business.hasMany(Brand, { foreignKey: "businessId" });
Brand.belongsTo(Business, {
  foreignKey: "businessId",
  onDelete: "CASCADE",
});

User.hasMany(Brand, { foreignKey: "userId" });
Brand.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = Brand;
