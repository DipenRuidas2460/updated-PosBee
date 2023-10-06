const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Business = require("./Business");

class BusinessLocation extends Model {}

BusinessLocation.init(
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
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    landmark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.CHAR(7),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alternateNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "businesslocations",
    indexes: [{ fields: ["businessId"] }],
    paranoid: true,
    sequelize,
  }
);

(async () => {
  await BusinessLocation.sync({ force: true });
})();

Business.hasMany(BusinessLocation, { foreignKey: "businessId" });
BusinessLocation.belongsTo(Business, {
  foreignKey: "businessId",
  onDelete: "CASCADE",
});

module.exports = BusinessLocation;
