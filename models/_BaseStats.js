/* Library & DB imports */
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

/* Establish Table as extension of Model class */
class BaseStats extends Model {}

BaseStats.init(
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
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        base_HP: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 10,
        },
        base_ATK: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0,
        },
        base_DEF: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'base_stats',
    }
);

module.exports = BaseStats;

/**
 * id
 * name
 * icon (image?)
 * type_id (id)
 * base_HP
 * base_ATK
 * base_DEF
**/