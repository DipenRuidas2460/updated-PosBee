const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./Users");

class Sessions extends Model {}

Sessions.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payload: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastActivity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "sessions",
    sequelize,
  }
);

(async () => {
  await Sessions.sync({ force: true });
})();

User.hasMany(Sessions, { foreignKey: "userId" });
Sessions.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "SET NULL", // Adjust the onDelete behavior based on your requirements
});

module.exports = Sessions;
