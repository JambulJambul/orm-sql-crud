const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PPRelation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    PPRelation.init({
        pp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        player_id: DataTypes.INTEGER,
        position_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'PPRelation',
        tableName: 'player_position_relation',
        timestamps: false
    });
    return PPRelation;
};