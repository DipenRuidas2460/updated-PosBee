const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const User = require("./Users");
const Business = require("./Business");

class Contacts extends Model {}

Contacts.init(
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
    type: {
      type: DataTypes.ENUM("supplier", "customer", "both"),
      allowNull: false,
    },
    supplierBusinessName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alternate_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payTermNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    payTermType: {
      type: DataTypes.ENUM("days", "months"),
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "contacts",
    paranoid: true,
    sequelize,
  }
);

(async () => {
  await Contacts.sync({ force: true });
})();

Business.hasMany(Contacts, {foreignKey: 'businessId'})
Contacts.belongsTo(Business, {
  foreignKey: "businessId",
  onDelete: "CASCADE",
});

User.hasMany(Contacts, {foreignKey: 'userId'})
Contacts.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = Contacts;
