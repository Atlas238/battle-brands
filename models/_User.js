/* Library & DB imports */
const { Model, DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize = require('../config/connection.js');

/* Establish Table as extension of Model class */
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

/* Initialize the Table */
User.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isAlphanumeric: true,
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail : true,
        }
    },
    password: {
        // Hashed only please! I think this works?
        type: DataTypes.STRING(64),
        allowNull: false,
        validate:{
            len:[8]
        }
    },
    // FEATURE 
    // funds: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //     validate: {
    //         isInt: true,
    //     }
    // }
  },
  {
    hooks:{
        beforeCreate: async  (newUserData)=>{
            newUserData.password = bcrypt.hashSync(newUserData.password,10);
            return newUserData;
        },
        beforeBulkCreate: async  (newUserData)=>{
            const hashedPasswords = newUserData.map(newUser=>{
                newUser.password = bcrypt.hashSync(newUser.password,10);
                return newUser;
            })
            return hashedPasswords;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

/* Export the Table Model */
module.exports = User;
