const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Business = require("./Business");

//  Create Permission Model

class Permissions extends Model {}

Permissions.init(
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

    guardName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "permissions",
    sequelize,
  }
);

(async () => {
  await Permissions.sync({ force: true });
})();

//  Create Roles Model

class Roles extends Model {}

Roles.init(
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

    guardName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    isDefault: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  },
  {
    tableName: "roles",
    sequelize,
  }
);

(async () => {
  await Roles.sync({ force: true });
})();

Business.hasMany(Roles, { foreignKey: "businessId" });
Roles.belongsTo(Business, {
  foreignKey: "businessId",
  onDelete: "CASCADE",
});

// create ModelHasPermissions

class ModelHasPermissions extends Model {}

ModelHasPermissions.init(
  {
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "permissions",
        key: "id",
      },
      onDelete: "cascade",
    },

    modelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modelType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "modelhaspermissions",
    timestamps: false,
    sequelize,
  }
);

(async () => {
  await ModelHasPermissions.sync({ force: true });
})();

Permissions.hasMany(ModelHasPermissions, { foreignKey: "permissionId" });
ModelHasPermissions.belongsTo(Permissions, {
  foreignKey: "permissionId",
  onDelete: "CASCADE",
});

// create ModelHasRoles

class ModelHasRoles extends Model {}

ModelHasRoles.init(
  {
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      require: true,
    },

    modelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modelType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "modelhasroles",
    timestamps: false,
    sequelize,
  }
);

(async () => {
  await ModelHasRoles.sync({ force: true });
})();

Roles.hasMany(ModelHasRoles, { foreignKey: "roleId" });
ModelHasRoles.belongsTo(Roles, {
  foreignKey: "roleId",
  onDelete: "CASCADE",
});

// create RoleHasPermissions

class RoleHasPermissions extends Model {}

RoleHasPermissions.init(
  {
    permissionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "rolehaspermissions",
    timestamps: false,
    sequelize,
  }
);

(async () => {
  await RoleHasPermissions.sync({ force: true });
})();

Permissions.hasMany(RoleHasPermissions, { foreignKey: "permissionId" });
RoleHasPermissions.belongsTo(Permissions, {
  foreignKey: "permissionId",
  onDelete: "CASCADE",
});

Roles.hasMany(RoleHasPermissions, { foreignKey: "roleId" });
RoleHasPermissions.belongsTo(Roles, {
  foreignKey: "roleId",
  onDelete: "CASCADE",
});

module.exports = {
  Permissions,
  Roles,
  ModelHasPermissions,
  ModelHasRoles,
  RoleHasPermissions,
};
