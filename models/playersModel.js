const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Players extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // 
            Players.belongsTo(models.Club, {
                as: 'playerclub',
                foreignKey: 'club_id'
            });
            Players.belongsToMany(models.Positions, {
                as: 'playerposition',
                through: 'PPRelation',
                foreignKey: 'player_id'
            })
        }
    }
    Players.init({
        player_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        player_name: DataTypes.STRING,
        club_id: DataTypes.INTEGER,
        is_deleted: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Players',
        paranoid: true,
    });
    return Players;
};