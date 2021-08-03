/* Library & DB imports */
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

/* Establish Table as extension of Model class */
class Boiler extends Model {}

Boiler.init(
    {

    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'boiler_plate',
)

/**
 * id
 * name
 * image
 * type_id (id)
 * base_HP
 * base_ATK
 * base_DEF
**/