/* Library & DB imports */
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

/* Establish Table as extension of Model class */
class CombatStats extends Model {}

CombatStats.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        atk: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        def: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'combatstat',
    }
);

module.exports = CombatStats;

/**
 * id
 * HP
 * ATK
 * DEF
 */