/* Library & DB imports */
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

/* Establish Table as extension of Model class */
class Type extends Model {}

Type.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [16],
            }
        },
        weakness_id: {
            // Points at self. Junction Table?
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'type',
    }
);

module.exports = Type;

/**
 * id
 * name
 * weakness_id (self)
 */