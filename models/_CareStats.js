/* Library & DB imports */
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

/* Establish Table as extension of Model class */
class Boiler extends Model {}

Boiler.init(
    {

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'boiler_plate',
    }
);

module.exports = Boiler;

/**
 * id
 * happiness
 * hunger
 * grooming
 * energy
 */