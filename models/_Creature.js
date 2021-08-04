/* Library & DB imports */
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

/* Establish Table as extension of Model class */
class Creature extends Model {}

Creature.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            // User has many Creature
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [16],
                isAlphanumeric: true
            }
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'brand',
                key: 'id',
            },
        },
        screenname: {
            // Optional
            type: DataTypes.STRING,
            allowNull: true,
        },
        exp: {
            type: DataTypes.INTEGER,
            default: 0,
        },
        health:
        {
            type: DataTypes.INTEGER,
            default: 0,
        },
        type_id: {
            type: DataTypes.INTEGER,
            references:{
                model:'type',
                key:'id',
            },
        },
        baseStats_id: {
            type: DataTypes.INTEGER,
            references:{
                model:'base_stats',
                key:'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'creature',
    },
);

module.exports = Creature;

/**
 * id
 * user_id (id)
 * name
 * brand_id (id)
 * screenname (optional)
 * combat_stats (id)
 * care_stats (id)
 * EXP
 * Health
**/