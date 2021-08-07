const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create our Quiz model
class Quiz extends Model {}
// Creates our Quiz Table
Quiz.init(
    // Quiz Table columns
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        category: {
            type: DataTypes.ENUM('General','Coding'),
            allowNull: false
        },
        user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
        }
    },
    // Table Configuration Specs
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'quiz'
    }
);

module.exports = Quiz;