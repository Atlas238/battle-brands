/* Library & DB imports */
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

/* Establish Table as extension of Model class */
class CareStats extends Model {}

CareStats.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        happiness: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1,
        },
        hunger: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1,
        },
        grooming: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1,
        },
        energy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'care_stats',
    }
);

module.exports = CareStats;

/**
 * id
 * happiness
 * hunger
 * grooming
 * energy
 */