/* Library & DB imports */
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

/* Establish Table as extension of Model class */
class Brand extends Model {}

Brand.init(
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
        type_id: {
            // Brand has one Type
            type: DataTypes.INTEGER,
            references: {
                model: 'type',
                key: 'id',
            },
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
        modelName: 'brand',
    }
);

module.exports = Brand;
/**
 * id
 * name
 * icon (image?)
 * type_id (id)
 * base_HP
 * base_ATK
 * base_DEF
**/