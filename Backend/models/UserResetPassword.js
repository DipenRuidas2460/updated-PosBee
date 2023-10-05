const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/dbConfig");

class UserResetPassword extends Model {}

UserResetPassword.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    fpToken: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "resetpasswords",
    sequelize,
  }
);

(async () => {
  await UserResetPassword.sync({ force: true });
})();

module.exports = UserResetPassword;
