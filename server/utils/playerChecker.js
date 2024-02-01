const db = require('../../models/index')
const _ = require('lodash');

const isPlayerDeleted = async (dataObject) => {
    const { player_id } = dataObject
    try {
        const playerData = await db.Players.findOne({
            where: {
                player_id: player_id,
            }
        });
        if (_.isEmpty(playerData)) {
            return Promise.resolve(true);
        }
        if (playerData.is_deleted == 0) {
            return Promise.resolve(false);
        } else if (playerData.is_deleted == 1) {
            return Promise.resolve(true);
        }
    } catch (err) {
        console.error(err);
        return Promise.reject("Failed to fetch player. Check the server logs for details.");
    }
}

module.exports = {
    isPlayerDeleted
}