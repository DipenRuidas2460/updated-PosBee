const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const User = require("./Users");
const Business = require("./Business");

class Units extends Model {}

Units.init(
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
    actualName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    allowDecimal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    tableName: "units",
    paranoid: true,
    sequelize,
  }
);

(async () => {
  await Units.sync({ force: true });
})();

Business.hasMany(Units, { foreignKey: "businessId" });
Units.belongsTo(Business, {
  foreignKey: "businessId",
  onDelete: "CASCADE",
});

User.hasMany(Units, { foreignKey: "userId" });
Units.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = Units;
