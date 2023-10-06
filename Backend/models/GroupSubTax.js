const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const TaxRates = require("./TaxRates");

class GroupSubTax extends Model {}

GroupSubTax.init(
  {
    groupTaxId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    taxId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "groupsubtaxes",
    indexes: [{ fields: ["groupTaxId"] }, { fields: ["taxId"] }],
    sequelize,
  }
);

(async () => {
  await GroupSubTax.sync({ force: true });
})();

TaxRates.hasMany(GroupSubTax, { foreignKey: "groupTaxId" });
GroupSubTax.belongsTo(TaxRates, {
  foreignKey: "groupTaxId",
  as: "groupTax",
  onDelete: "CASCADE",
});

TaxRates.hasMany(GroupSubTax, { foreignKey: "taxId" });
GroupSubTax.belongsTo(TaxRates, {
  foreignKey: "taxId",
  as: "subTax",
  onDelete: "CASCADE",
});

module.exports = GroupSubTax;
