const { DataTypes } = require('sequelize')
const seq = require('../db/db_sequ')

const User = seq.define(
    'zd_user',
    {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_admin: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        tableName: 'zd_user',
        timestamps: false,
    }
)

module.exports = User
