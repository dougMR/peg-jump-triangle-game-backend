const {DataTypes} = require('sequelize');

module.exports = (db, Sequelize) => {
    return db.define('GameRecord', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        player_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        moves_history: {
            // DMR ? 2/28/25 ? on the front end, this is an array of arrays of objects
            type: DataTypes.JSON,
            allowNull: false,
        },
        // DMR 02/28/25 ? does createdAt and updatedAt get added automatically?
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        // time: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
    }, ); //{timestamps: false}
}