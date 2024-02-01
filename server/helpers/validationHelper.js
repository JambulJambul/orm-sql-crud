const Joi = require('joi');
const Boom = require('boom');

const playerDetailValidation = (data) => {
  const schema = Joi.object({
    player_id: Joi.number().required().description('Player id; i.e. 1'),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const addPlayerValidation = (data) => {
  const schema = Joi.object({
    player_name: Joi.string().required().description('Player Name; i.e. Lionel Messi'),
    club_id: Joi.number().required().description('Club Id; i.e. 2'),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const playerPositionValidation = (data) => {
  const schema = Joi.object({
    player_id: Joi.number().required().description('Player id; i.e. 1'),
    position_id: Joi.number().required().description('Club Id; i.e. 2'),
  });
  
  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const addClubValidation = (data) => {
  const schema = Joi.object({
    club_name: Joi.string().required().description('Club Name; i.e. Liverpool FC'),
    club_location: Joi.string().required().description('Club Location; i.e. Bandung'),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const editPlayerBodyValidation = (data) => {
  const schema = Joi.object({
    player_name: Joi.string().optional().description('Player Name; i.e. Lionel Messi'),
    club_id: Joi.number().optional().description('Club Id; i.e. 2'),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  playerDetailValidation, addPlayerValidation, playerPositionValidation, addClubValidation, editPlayerBodyValidation
};
