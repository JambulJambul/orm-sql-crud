const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Positions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // 
            Positions.belongsToMany(models.Players, {
                as: 'positions',
                through: 'PPRelation',
                foreignKey: 'position_id'
            });
        }
    }
    Positions.init({
        position_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        position_name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Positions',
        timestamps: false
    });
    return Positions;
};