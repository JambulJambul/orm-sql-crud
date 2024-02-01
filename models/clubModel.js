const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Club extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Club.hasMany(models.Players, {
                as: 'playerclub',
                foreignKey: 'club_id'
            });
        }
    }
    Club.init({
        club_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        club_name: DataTypes.STRING,
        club_location: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Club',
        tableName: 'club',
        timestamps: false
    });
    return Club;
};