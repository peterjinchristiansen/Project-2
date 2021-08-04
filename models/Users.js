const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create our Users model
class Users extends Model {}
// Creates our Users Table
Users.init(
    // Quiz Table columns
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
    // Table Configuration Specs
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'users',
        timestamps: false
    }
);

module.exports = Users;