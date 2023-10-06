const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const VariationTemplate = require("./VariationTemplate");

class VariationValueTemplate extends Model {}

VariationValueTemplate.init(
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
    variationTemplateId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "variationvaluetemplate",
    indexes: [{ fields: ["name"] }, { fields: ["variationTemplateId"] }],
    sequelize,
  }
);

(async () => {
  await VariationValueTemplate.sync({ force: true });
})();

VariationTemplate.hasMany(VariationValueTemplate, {
  foreignKey: "variationTemplateId",
});

VariationValueTemplate.belongsTo(VariationTemplate, {
  foreignKey: "variationTemplateId",
  onDelete: "CASCADE",
});

module.exports = VariationValueTemplate;
