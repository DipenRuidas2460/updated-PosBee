const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Business = require("./Business");

class VariationTemplate extends Model {}

VariationTemplate.init(
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
  },
  {
    tableName: "variationtemplates",
    sequelize,
  }
);

(async () => {
  await VariationTemplate.sync({ force: true });
})();

Business.hasMany(VariationTemplate, { foreignKey: "businessId" });
VariationTemplate.belongsTo(Business, {
  foreignKey: "businessId",
  onDelete: "CASCADE",
});

module.exports = VariationTemplate;
