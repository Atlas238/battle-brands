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
            references: {
                model: 'brand',
                key: 'id',
            },
        },
        screenname: {
            // Optional
            type: DataTypes.STRING,
            allowNull: TRUE,
        },
        combat_stats:{
            type: DataTypes.INTEGER,
            // One-to-one
            references: {
                model: 'combat_stats',
                key: 'id',
            },
        },
        care_stats:{
            type: DataTypes.INTEGER,
            // One-to-one
            references: {
                model: 'care_stats',
                key: 'id',
            },
        },
        EXP: {
            type: DataTypes.INTEGER,
            default: 0,
        },
        Health: 
        {
            type: DataTypes.INTEGER,
            default: 0,
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