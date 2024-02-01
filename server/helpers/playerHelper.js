const db = require('../../models/index')
const _ = require('lodash');
const PlayerChecker = require('../utils/playerChecker')

const getAllPlayers = async () => {
    try {
        const players = await db.Players.findAll({
            attributes: { exclude: ['is_deleted', 'createdAt', 'updatedAt', 'deletedAt'] }
        });
        if (_.isEmpty(players)) {
            const message = "No player found in the database.";
            res = { message };
            return Promise.resolve(res);
        }
        const message = "Get player list successful.";
        const res = { message, players }
        return Promise.resolve(res);
    } catch (err) {
        console.error(err);
        return Promise.reject("Failed to fetch players. Check the server logs for details.");
    }
}

const getPlayerDetails = async (dataObject) => {
    const { player_id } = dataObject
    try {
        const isDeleted = await PlayerChecker.isPlayerDeleted({ player_id })
        if (isDeleted == true) {
            const message = 'Player doesn\'t exist in the database'
            const res = { message }
            return Promise.resolve(res)
        }
        const playerData = await db.Players.findOne({
            where: {
                player_id: player_id,
            }
        })
        const playerPositionId = await db.PPRelation.findAll({
            where: {
                player_id: player_id,
            }
        })
        const playerPositions = [];
        if (!_.isEmpty(playerPositionId)) {
            playerPositionId.map(async (item) => {
                let positionData = await db.Positions.findAll({
                    where: {
                        position_id: item.position_id
                    }
                })
                if (!_.isEmpty(positionData)) {
                    playerPositions.push(positionData[0].position_name)
                }
            })
        }
        const club_id = playerData.club_id
        const clubData = await db.Club.findAll({
            where: {
                club_id: club_id
            }
        })
        const playerDetailObject = {
            playerName: playerData.player_name,
            clubName: !_.isEmpty(clubData) ? clubData[0].club_name : "-",
            positions: !_.isEmpty(playerPositions) ? playerPositions : "-"
        }
        const message = "Get player details successful.";
        res = { message, playerDetailObject };
        return Promise.resolve(res);
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const addNewPlayer = async (dataObject) => {
    const { player_name, club_id } = dataObject
    try {
        const isAdded = await db.Players.create({ player_name: player_name, club_id: club_id })
        if (isAdded == false) {
            const message = 'Operation was unsucessful'
            const res = { message }
            return Promise.resolve(res)
        }
        const message = `The player ${player_name} has been added to the database.`
        const res = { message }
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const addPlayerPosition = async (dataObject) => {
    const { player_id, position_id } = dataObject
    try {
        const isDeleted = await PlayerChecker.isPlayerDeleted({ player_id })
        if (isDeleted == true) {
            const message = 'Player doesn\'t exist in the database'
            const res = { message }
            return Promise.resolve(res)
        }
        const isAdded = await db.PPRelation.create({ player_id: player_id, position_id: position_id });
        if (isAdded == false) {
            const message = 'Operation was unsucessful'
            const res = { message }
            return Promise.resolve(res)
        }
        const message = `The position for player id = ${player_id} has been added to the database.`
        const res = { message }
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const addClub = async (dataObject) => {
    const { club_name, club_location } = dataObject
    try {
        const isAdded = await db.Club.create({ club_name: club_name, club_location: club_location });
        if (isAdded == false) {
            const message = 'Operation was unsucessful'
            const res = { message }
            return Promise.resolve(res)
        }
        const message = `The club ${club_name} has been added to the database.`
        const res = { message }
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const editPlayer = async (dataObject) => {
    const { player_id, player_name, club_id } = dataObject
    try {
        const isDeleted = await PlayerChecker.isPlayerDeleted({ player_id })
        if (isDeleted == true) {
            const message = 'Player doesn\'t exist in the database'
            const res = { message }
            return Promise.resolve(res)
        }
        let isEdited = false
        let message = ""
        if (player_name) {
            await db.Players.update({
                player_name: player_name
            }, {
                where: {
                    player_id: player_id,
                },
                returning: true,
            }).then(function (result) {
                console.log(result)
                if (result[1] == 1) {
                    message += "Player's name has been updated. "
                }
            });
            isEdited = true
        }
        if (club_id) {
            await db.Players.update({
                club_id: club_id
            }, {
                where: {
                    player_id: player_id,
                },
                returning: true,
            }).then(function (result) {
                console.log(result)
                if (result[1] == 1) {
                    message += "Player's club has been updated. "
                }
            });
            isEdited = true
        }
        if (isEdited == false) {
            const message = 'Operation was unsucessful'
            const res = { message }
            return Promise.resolve(res)
        }
        message += `The player with id = ${player_id} information has been edited.`
        const res = { message }
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const deletePlayer = async (dataObject) => {
    const { player_id } = dataObject
    try {
        const isEdited = await db.Players.update({
            is_deleted: 1
        }, {
            where: {
                player_id: player_id
            },
        });
        await db.Players.destroy({
            where: {
                player_id: player_id
            }
        })
        console.log(isEdited)
        if (isEdited == false) {
            const message = 'Operation was unsucessful'
            const res = { message }
            return Promise.resolve(res)
        }
        const message = `The player with id = ${player_id} information has been deleted.`
        const res = { message }
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const deletePlayerPosition = async (dataObject) => {
    const { player_id, position_id } = dataObject
    try {
        const isEdited = await db.PPRelation.destroy({
            where: {
                player_id: player_id,
                position_id: position_id
            },
        });
        if (isEdited == false) {
            const message = 'Operation was unsucessful'
            const res = { message }
            return Promise.resolve(res)
        }
        const message = `The player with id = ${player_id} position has been deleted.`
        const res = { message }
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const getClubList = async () => {
    try {
        const response = await db.Club.findAll();
        if (_.isEmpty(response)) {
            const message = "No player found in the database.";
            res = { message };
            return Promise.resolve(res);
        }
        const message = "Get all Clubs successful.";
        res = { message, response };
        return Promise.resolve(res);
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const restorePlayer = async (dataObject) => {
    const { player_id } = dataObject
    try {
        await db.Players.restore({
            where: {
                player_id: player_id
            }
        })
        await db.Players.update({
            is_deleted: 0
        }, {
            where: {
                player_id: player_id
            },
        });
        const message = `Player with the id = ${player_id} has been restored`
        const res = {message}
        return Promise.resolve(res);
    } catch (error) {
        console.log(error)
        throw new error
    }
}


module.exports = {
    getAllPlayers,
    getPlayerDetails,
    addNewPlayer,
    addPlayerPosition,
    addClub,
    editPlayer,
    deletePlayer,
    deletePlayerPosition,
    getClubList,
    restorePlayer
}